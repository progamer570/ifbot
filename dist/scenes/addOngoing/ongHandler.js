import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import { sendToCollectionOng2, sendToLogGroup } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import logger from "../../utils/logger.js";
async function startCopying(ctx) {
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Add Ongoing canceled. Start again with /addong");
        ctx.session.done = false;
        return await ctx.scene.leave();
    }
    else if (ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/addong")) {
        // if (ctx.message.text.split(" ").length !== 2) return ctx.reply("wrong format");
        ctx.session.shareId = Number(ctx.message.text.replace("/addong", "").trim().trimStart());
        await ctx.reply("Please send the files for the ongoing item.");
    }
    else {
        const selectedShareId = ctx.session.shareId || 0;
        if (ctx.message &&
            "text" in ctx.message &&
            ctx.message.text.toLowerCase() === "done" &&
            !ctx.session.done) {
            const { msgIds, captions } = ctx.session;
            await ctx.reply(`\`\`\`Ongoing item details and files received. 🎉\`\`\``, {
                parse_mode: "HTML",
            });
            ctx.session.done = true;
            logger.info("Collected message IDs:", msgIds, "and captions:", captions);
            const forwardedMessageIds = await telegram.forwardMessages(env.dbOngoingChannelId, ctx.chat?.id, msgIds ? msgIds : [], false, captions);
            await database.addOngoing(selectedShareId, forwardedMessageIds);
            try {
                if (!captions || !msgIds) {
                    logger.error("Error: captions or messageIds is undefined");
                    return;
                }
                const links = captions.map((caption, index) => ({
                    caption,
                    messageId: forwardedMessageIds[index] || "",
                }));
                await sendToCollectionOng2(env.collectionOngoing, undefined, links, selectedShareId.toString());
                const user = {
                    id: ctx.from.id,
                    firstname: ctx.from.first_name,
                    username: ctx.from.username,
                };
                await sendToLogGroup(env.logGroupId, getUserLinkMessage(`Added episode(s) to Ongoing ${selectedShareId} by `, user));
                const session = ctx.session;
                session.captions = [];
                session.msgIds = [];
            }
            catch (e) {
                logger.error("Error in addOngoing handler:", e);
            }
            return await ctx.scene.leave();
        }
        else {
            await ctx.reply(`Send the next file, or click 'Done' if you are finished. Current files: ${ctx.session.msgIds?.length}`, keyboard.oneTimeDoneKeyboard());
            const session = ctx.session;
            session.msgIds = session.msgIds || [];
            session.msgIds.push(ctx.message.message_id);
            let caption = "no caption";
            if ("caption" in ctx.message) {
                caption = ctx.message.caption || "I_F";
            }
            session.captions = session.captions || [];
            session.captions.push(caption);
        }
    }
}
export { startCopying };
