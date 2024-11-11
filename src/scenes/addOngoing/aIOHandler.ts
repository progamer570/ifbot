import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import { AIOSessionData } from "./wizardSessionData.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import AIOWizardContext from "./aIOWizardContext.js";
import { sendToCOllectionOng, sendToLogGroup } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getRandomId from "../../extra/getRandomId.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import { delay } from "../../extra/delay.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";

async function startCopying(ctx: AIOWizardContext) {
  if (
    ctx.message &&
    "text" in ctx.message &&
    (ctx.message.text.toLowerCase() === "done" || ctx.message.text === "/cancel")
  ) {
    await ctx.reply("Share AIO Canceled start again /addaio");
    (ctx.session as AIOSessionData).done = false;
    return await ctx.scene.leave();
  } else if (ctx.message && "text" in ctx.message && ctx.message.text === "/addaio") {
    await ctx.reply("send Files");
  } else {
    await ctx.reply(
      `Send next file if Done Click Done ${(ctx.session as AIOSessionData).msgId?.length}`,
      keyboard.oneTimeDoneKeyboard()
    );
    let caption: string = getRandomId().toString();
    const msgId: number = ctx.message.message_id;
    if ("caption" in ctx.message) {
      caption = ctx.message.caption || "????";
      if ("document" in ctx.message) {
        caption = ctx.message.document.file_name || "no caption";
      } else {
        caption = ctx.message.caption || "no caption";
      }
      const AIODetails = {
        aIOTitle: processCaption(caption, env.join) || "",
        backupChannel: "none",
        messageIds: [msgId],
        aIOPosterID: "none",
      };
      const forwardedMessageIds = await telegram.forwardMessages(
        env.dbOngoingChannelId,
        ctx.chat?.id,
        [msgId],
        false,
        [caption]
      );
      try {
        const AIOData = await getAIOdata(AIODetails, forwardedMessageIds);
        const shareId = AIOData ? await database.saveOngoing(AIOData) : null;
        const botUsername = ctx.botInfo.username;
        const link = shareId ? `https://t.me/${botUsername}?start=${shareId}-ong` : null;
        if (!AIOData || !shareId || !link) {
          throw new Error("Failed to process the request ");
        }
        await ctx.reply(link + "\n");
        await delay(500, 1000);
        await sendToCOllectionOng(
          env.collectionOngoing,
          link,
          processCaption(caption || "none", env.join)
        );
        try {
          const user = {
            id: ctx.from.id,
            firstname: ctx.from.first_name,
            username: ctx.from.username,
          };
          await sendToLogGroup(
            env.logGroupId,
            getUserLinkMessage(`Added Ongoing ${caption} by `, user)
          );
        } catch {}
      } catch (error) {
        return await ctx.scene.leave();
      }
    }
  }
}
export { startCopying };
