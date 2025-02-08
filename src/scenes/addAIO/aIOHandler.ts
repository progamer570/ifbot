import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import { AIOSessionData } from "./wizardSessionData.js";
import telegram from "../../services/telegram.js";
import env from "../../services/env.js";
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import AIOWizardContext from "./aIOWizardContext.js";
import { sendToCOllection, sendToLogGroup } from "../../utils/sendToCollection.js";
import getRandomId from "../../extra/getRandomId.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { processCaptionForStore } from "../../utils/caption/editCaption.js";
import { getPhotoUrl } from "../../utils/getPhotoUrl.js";
import { Writable } from "stream";
import { createWriteStream } from "fs";
import { sendToWebsite } from "../../services/sendToWebsite.js";

async function askTitleAIO(ctx: AIOWizardContext) {
  (ctx.session as AIOSessionData).messageIds = [];
  (ctx.session as AIOSessionData).captions = [];
  (ctx.session as AIOSessionData).done = false;
  (ctx.session as AIOSessionData).isHindi = false;

  await ctx.reply(
    `\`\`\`note\n you can not delete anything \n until the last step from here \n after you can \n cancel anytime say\`\`\` /cancel`,
    {
      parse_mode: "MarkdownV2",
    }
  );
  if (ctx.message && "text" in ctx.message && ctx.message.text === "/addh") {
    (ctx.session as AIOSessionData).isHindi = true;
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
  } else {
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
- Language (must be Original; dual languages optional) 
- Synopsis (optional) 
- Subtitles (must be English Subtitles; dual Subtitles optional)\n for cancel say /cancel`);
  }

  return ctx.wizard.next();
}

async function handleTitleAskPoster(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel") {
    (ctx.session as AIOSessionData).aIOTitle = ctx.message.text;
    (ctx.session as AIOSessionData).captions?.push(ctx.message.text);

    await ctx.reply("Send me poster that realated to it (a Image Of) ");
    return ctx.wizard.next();
  } else {
    return await ctx.scene.leave();
  }
}

async function handlePosterAskRelatedMsg(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
    await ctx.reply("Share AIO Canceled start again /add");
    return await ctx.scene.leave();
  }
  if (ctx.message && "photo" in ctx.message) {
    const photoFileId: string = ctx.message.photo[0].file_id;
    const { file_id } = ctx.message.photo.pop()!;
    const webPhotoUrl = await download(file_id, "./photos/poster.jpg");
    (ctx.session as AIOSessionData).aIOPosterID = photoFileId;
    (ctx.session as AIOSessionData).webPhotoUrl = webPhotoUrl;
    (ctx.session as AIOSessionData).messageIds = (ctx.session as AIOSessionData).messageIds || [];
    (ctx.session as AIOSessionData).messageIds?.push(ctx.message.message_id);
    await ctx.reply("Send me files and message that realated to it ");
    return ctx.wizard.next();
  } else {
    await ctx.reply(`\`\`\`Wrong \n  you need to send a image\n\`\`\``, {
      parse_mode: "MarkdownV2",
    });
  }
}

async function done(ctx: AIOWizardContext) {
  if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
    await ctx.reply("Share AIO Canceled start again /add");
    return await ctx.scene.leave();
  }
  if (ctx.message) {
    const text: string = "text" in ctx.message ? ctx.message.text : "";

    if (text.toLowerCase() === "done" && !(ctx.session as AIOSessionData).done) {
      const { backupChannel, messageIds, aIOPosterID, captions } = ctx.session as AIOSessionData;
      let { aIOTitle, webPhotoUrl } = ctx.session as AIOSessionData;
      const photoUrl = await getPhotoUrl(aIOPosterID);
      const AIODetails = {
        aIOTitle,
        backupChannel,
        messageIds,
        aIOPosterID: photoUrl,
        captions,
      };

      await ctx.reply(`\`\`\`AIO details and file received.\n${AIODetails.aIOTitle} 🎉\`\`\``, {
        parse_mode: "MarkdownV2",
      });
      (ctx.session as AIOSessionData).done = true;
      const forwardedMessageIds = await telegram.forwardMessages(
        env.dbAIOChannelId,
        ctx.chat?.id,
        AIODetails.messageIds ? AIODetails.messageIds : [],
        false,
        captions
      );

      try {
        const AIOData = await getAIOdata(AIODetails, forwardedMessageIds);
        let shareId;
        let link;
        const botUsername = ctx.botInfo.username;

        if ((ctx.session as AIOSessionData).isHindi) {
          shareId = AIOData ? await database.saveHindiDrama(AIOData) : null;
          link = shareId ? `https://t.me/${botUsername}?start=${shareId}-hindi` : null;
        } else {
          shareId = AIOData ? await database.saveAIO(AIOData) : null;
          link = shareId ? `https://t.me/${botUsername}?start=${shareId}-eng` : null;
        }
        if (!AIOData || !shareId || !link || !webPhotoUrl) {
          await ctx.reply("Share AIO Canceled start again /add");
          return await ctx.scene.leave();
        }
        await ctx.reply(link + " " + AIOData.aioShortUrl);
        try {
          if ((ctx.session as AIOSessionData).isHindi) {
            await sendToCOllection(
              env.collectionHindi,
              AIOData.aIOPosterID,
              link,
              AIOData.aIOTitle || "none"
            );

            try {
              await sendToWebsite(
                `${env.apiBaseUrl}/add-aio`,
                webPhotoUrl.replace(`${env.token}`, "token"),
                env.apiFetchToken,
                {
                  ...AIOData,
                  isHindi: true,
                }
              );
            } catch (error) {
              console.error("Error sending to website (Hindi):", error);
            }
          } else {
            await Promise.all([
              sendToCOllection(env.collectionAIO, aIOPosterID, link, aIOTitle || "none"),
              sendToCOllection(env.collectionAIOBackup, aIOPosterID, link, aIOTitle || "none"),
            ]);

            try {
              await sendToWebsite(
                `${env.apiBaseUrl}/add-aio`,
                webPhotoUrl.replace(`${env.token}`, "token"),
                env.apiFetchToken,
                {
                  ...AIOData,
                  isHindi: false,
                }
              );
            } catch (error) {
              console.error("Error sending to website (AIO):", error);
            }
          }
        } catch (error) {
          console.error("Error processing AIO content:", error);
        }

        try {
          const user = {
            id: ctx.from.id,
            firstname: ctx.from.first_name,
            username: ctx.from.username,
          };
          await sendToLogGroup(
            env.logGroupId,
            getUserLinkMessage(
              `${processCaptionForStore(AIODetails.aIOTitle?.slice(0, 40) || "none")} added by ...`,
              user
            )
          );
        } catch {}
        return await ctx.scene.leave();
      } catch (error) {
        return await ctx.scene.leave();
      }
    } else {
      await ctx.reply(
        `Send next file if Done Click Done ${(ctx.session as AIOSessionData).messageIds?.length}`,
        keyboard.oneTimeDoneKeyboard()
      );
      (ctx.session as AIOSessionData).messageIds?.push(ctx.message.message_id);
      let caption: string = getRandomId().toString();

      if ("document" in ctx.message && ctx.message.document.file_name) {
        caption = ctx.message.document.file_name;
        (ctx.session as AIOSessionData).captions = (ctx.session as AIOSessionData).captions || [];
        (ctx.session as AIOSessionData).captions?.push(caption);
      } else if ("caption" in ctx.message) {
        caption = ctx.message.caption || " ";
        (ctx.session as AIOSessionData).captions = (ctx.session as AIOSessionData).captions || [];
        (ctx.session as AIOSessionData).captions?.push(caption);
      } else {
        caption = "no caption";
        (ctx.session as AIOSessionData).captions = (ctx.session as AIOSessionData).captions || [];
        (ctx.session as AIOSessionData).captions?.push(caption);
      }
    }
  }
}

export { askTitleAIO, handleTitleAskPoster, done, handlePosterAskRelatedMsg };
const download = async (fromFileId: string, toPath: string): Promise<string> => {
  const link = await telegram.app.telegram.getFileLink(fromFileId);
  console.log(link);
  const res = await fetch(link.toString());
  return res.url;
  //  await res.body!.pipeTo(Writable.toWeb(createWriteStream(toPath)));
};
