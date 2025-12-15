import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import env from "../../services/env.js";
import database from "../../services/database.js";
import getAIOdata from "./ongDocument.js";
import { sendToCollectionOng2, sendToLogGroup, } from "../../utils/sendToCollection.js";
import getRandomId from "../../extra/getRandomId.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { processCaptionForStore } from "../../utils/caption/editCaption.js";
import { getPhotoUrl } from "../../utils/getPhotoUrl.js";
import { getUrlFromFileId } from "../../utils/helper.js";
import logger from "../../utils/logger.js";
async function askTitleAIO(ctx) {
    ctx.session.messageIds = [];
    ctx.session.captions = [];
    ctx.session.done = false;
    ctx.session.isHindi = false;
    await ctx.reply(`\`\`\`note\n you can not delete anything \n until the last step from here \n after you can \n cancel anytime say\`\`\` /cancel`, {
        parse_mode: "MarkdownV2",
    });
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/createong") {
        ctx.session.isHindi = true;
        await ctx.reply(`Send the title of the Hindi drama/movie along with the following details:\n
- Original Name 
- Also Known As (if applicable) 
- Year 
- Rating 
- Cast (optional) 
- Directors (optional) 
- Genres 
- Episodes (if it’s a drama) 
- Quality (can be 720p, 540p, 1080p, or 480p) 
- Language (must be Hindi; dual languages optional) 
- Synopsis (optional) 
- Subtitles (optional)\n for cancel say /cancel`);
    }
    return ctx.wizard.next();
}
async function handleTitleAskPoster(ctx) {
    if (ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel") {
        ctx.session.aIOTitle = ctx.message.text;
        ctx.session.captions?.push(ctx.message.text);
        await ctx.reply("Send me poster that realated to it (a Image Of) ");
        return ctx.wizard.next();
    }
    else {
        return await ctx.scene.leave();
    }
}
async function handlePosterAskRelatedMsg(ctx) {
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Share Creation Canceled start again /createong");
        return await ctx.scene.leave();
    }
    if (ctx.message && "photo" in ctx.message) {
        const photoFileId = ctx.message.photo[0].file_id;
        const { file_id } = ctx.message.photo.pop();
        const webPhotoUrl = await getUrlFromFileId(file_id);
        ctx.session.aIOPosterID = photoFileId;
        ctx.session.webPhotoUrl = webPhotoUrl;
        ctx.session.messageIds = ctx.session.messageIds || [];
        ctx.session.messageIds?.push(ctx.message.message_id);
        await ctx.reply("Send me files and message that realated to it ");
        return ctx.wizard.next();
    }
    else {
        await ctx.reply(`\`\`\`Wrong \n  you need to send a image\n\`\`\``, {
            parse_mode: "MarkdownV2",
        });
    }
}
async function done(ctx) {
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Share Creation Canceled start again /createong");
        return await ctx.scene.leave();
    }
    if (ctx.message) {
        const text = "text" in ctx.message ? ctx.message.text : "";
        if (text.toLowerCase() === "done" && !ctx.session.done) {
            const { backupChannel, messageIds, aIOPosterID, captions } = ctx.session;
            let { aIOTitle, webPhotoUrl } = ctx.session;
            const photoUrl = await getPhotoUrl(aIOPosterID);
            const AIODetails = {
                aIOTitle,
                backupChannel,
                messageIds,
                aIOPosterID: photoUrl,
                captions,
            };
            await ctx.reply(`\`\`\`Creation details and file received.\n${AIODetails.aIOTitle} 🎉\`\`\``, {
                parse_mode: "MarkdownV2",
            });
            ctx.session.done = true;
            const forwardedMessageIds = await telegram.forwardMessages(env.dbOngoingChannelId, ctx.chat?.id, AIODetails.messageIds ? AIODetails.messageIds : [], false, captions);
            try {
                const AIOData = await getAIOdata(AIODetails, forwardedMessageIds, "ongoing");
                let shareId;
                let link;
                const botUsername = ctx.botInfo.username;
                shareId = AIOData ? await database.createOngoing(AIOData) : null;
                link = shareId ? `https://t.me/${botUsername}?start=${shareId}-eng` : null;
                if (!AIOData || !shareId || !link || !webPhotoUrl) {
                    await ctx.reply("Share Creation Canceled start again /createong");
                    return await ctx.scene.leave();
                }
                await ctx.reply(link);
                try {
                    if (!captions || !forwardedMessageIds) {
                        logger.error("Error: captions or messageIds is undefined");
                        return;
                    }
                    const links = captions.map((caption, index) => ({
                        caption,
                        messageId: forwardedMessageIds[index] || "",
                    }));
                    await sendToCollectionOng2(env.collectionOngoing, aIOPosterID, links, shareId ? String(shareId) : undefined);
                    // try {
                    //   await addToWebsite(webPhotoUrl.replace(`${env.token}`, "token"), {
                    //     ...AIOData,
                    //     isHindi: false,
                    //   });
                    // } catch (error) {
                    //   console.error("Error sending to website (AIO):", error);
                    // }
                }
                catch (error) {
                    logger.error("Error processing AIO content for ongoing creation:", error);
                }
                try {
                    const user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    await sendToLogGroup(env.logGroupId, getUserLinkMessage(`${processCaptionForStore(AIODetails.aIOTitle?.slice(0, 40) || "none")} added by ...`, user));
                }
                catch (e) {
                    logger.error("Error sending log to group for ongoing creation:", e);
                }
                return await ctx.scene.leave();
            }
            catch (error) {
                logger.error("Error in ongoing creation wizard:", error);
                return await ctx.scene.leave();
            }
        }
        else {
            await ctx.reply(`Send next file if Done Click Done ${ctx.session.messageIds?.length}`, keyboard.oneTimeDoneKeyboard());
            const session = ctx.session;
            session.messageIds = session.messageIds || [];
            session.messageIds.push(ctx.message.message_id);
            let caption = getRandomId().toString();
            if ("document" in ctx.message && ctx.message.document.file_name) {
                caption = ctx.message.document.file_name;
            }
            else if ("caption" in ctx.message) {
                caption = ctx.message.caption || " ";
            }
            else {
                caption = "no caption";
            }
            session.captions = session.captions || [];
            session.captions.push(caption);
        }
    }
}
export { askTitleAIO, handleTitleAskPoster, done, handlePosterAskRelatedMsg };
