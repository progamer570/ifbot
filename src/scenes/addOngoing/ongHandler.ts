import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import { AIOSessionData } from "./wizardSessionData.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import AIOWizardContext from "./ongWizardContext.js";
import { sendToCollectionOng2, sendToLogGroup } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getRandomId from "../../extra/getRandomId.js";

import getUserLinkMessage from "../../utils/getUserLinkMessage.js";

async function startCopying(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
    await ctx.reply("Share AIO Canceled start again /addaio");
    (ctx.session as AIOSessionData).done = false;
    return await ctx.scene.leave();
  } else if (ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/addong")) {
    // if (ctx.message.text.split(" ").length !== 2) return ctx.reply("wrong format");
    (ctx.session as AIOSessionData).shareId = Number(
      ctx.message.text.replace("/addong", "").trim().trimStart()
    );
    await ctx.reply("send Files");
  } else {
    const selectedShareId = (ctx.session as AIOSessionData).shareId || 0;
    if (
      ctx.message &&
      "text" in ctx.message &&
      ctx.message.text.toLowerCase() === "done" &&
      !(ctx.session as AIOSessionData).done
    ) {
      const { msgIds, captions } = ctx.session as AIOSessionData;
      await ctx.reply(`\`\`\`Add on going details and file received.\n 🎉\`\`\``, {
        parse_mode: "HTML",
      });
      (ctx.session as AIOSessionData).done = true;
      console.log(msgIds, captions);
      const forwardedMessageIds = await telegram.forwardMessages(
        env.dbOngoingChannelId,
        ctx.chat?.id,
        msgIds ? msgIds : [],
        false,
        captions
      );
      await database.addOngoing(selectedShareId, forwardedMessageIds);

      try {
        if (!captions || !msgIds) {
          console.error("Error: captions or messageIds is undefined");
          return;
        }
        const links = captions.map((caption, index) => ({
          caption,
          messageId: forwardedMessageIds[index] || "",
        }));

        await sendToCollectionOng2(
          env.collectionOngoing,
          undefined,
          links,
          selectedShareId.toString()
        );
        const user = {
          id: ctx.from.id,
          firstname: ctx.from.first_name,
          username: ctx.from.username,
        };
        await sendToLogGroup(
          env.logGroupId,
          getUserLinkMessage(`Added eps To AIO ${selectedShareId} by `, user)
        );
      } catch {}
      return await ctx.scene.leave();
    } else {
      await ctx.reply(
        `Send next file if Done Click Done ${(ctx.session as AIOSessionData).msgIds?.length}`,
        keyboard.oneTimeDoneKeyboard()
      );

      const session = ctx.session as AIOSessionData;
      session.msgIds = session.msgIds || [];
      session.msgIds.push(ctx.message.message_id);
      let caption: string = "no caption";
      if ("caption" in ctx.message) {
        caption = ctx.message.caption || "I_F";
      }
      session.captions = session.captions || [];
      session.captions.push(caption);
    }
  }
}
export { startCopying };
