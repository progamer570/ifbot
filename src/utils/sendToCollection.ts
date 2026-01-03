import e from "express";
import env from "../services/env.js";
import telegram from "./../services/telegram.js";
import { processCaption } from "./caption/editCaption.js";
import { convertToTinySubscript, escapeMarkdownV2 } from "./helper.js";
import * as keyboard from "./markupButton/permanantButton/keyboard.js";
import database from "../services/database.js";

export async function sendToCOllection(
  chat: any,
  aIOPosterID: string | undefined,
  link: string,
  caption: string
): Promise<void> {
  try {
    await telegram.app.telegram.sendPhoto(chat, aIOPosterID || "", {
      caption: `<b>${caption}</b>`,
      parse_mode: "HTML",
      reply_markup: keyboard.makeCollectionButton(link),
    });
    console.log("Photo sent successfully!");
  } catch (error) {
    console.error("Error sending photo:", error);
  }
}
export async function sendToCOllectionOng(chat: any, link: string, caption: string): Promise<void> {
  try {
    await telegram.app.telegram.sendMessage(chat, `\`\`\`\n${caption}\n\`\`\`` || "", {
      parse_mode: "Markdown",
      reply_markup: keyboard.makeCollectionButton(link),
    });
    console.log("Photo sent successfully!");
  } catch (error) {
    console.error("Error sending photo:", error);
  }
}
export async function sendToCollectionOng2(
  chat: any,
  aIOPoster: string | undefined,
  links: { caption: string; messageId: string | number }[],
  shareId = ""
): Promise<void> {
  if (aIOPoster) {
    try {
      const captionText = `\`\`\`\n${links[0].caption}\n\`\`\``;
      const shareText = shareId
        ? `\n[🔗add ongoing](tg://msg?text=/addong${encodeURIComponent(shareId)})`
        : "";

      await telegram.app.telegram.sendPhoto(chat, aIOPoster, {
        caption: captionText + shareText,
        parse_mode: "Markdown",
      });
    } catch (error) {
      console.error("Error sending photo:", error);
    }
  }
  try {
    if (shareId) {
      const photo = await database.getOngoingMessages(Number(shareId)).then((result) => {
        return result?.aIOPosterID || "";
      });
      console.log(photo + "hvjh");
      if (!photo) {
        return;
      }
      const chunkSize = 10;
      for (let i = 0; i < links.length; i += chunkSize) {
        const chunk = links.slice(i, i + chunkSize);

        const formattedLinks = chunk
          .map(
            (item) =>
              `[*${escapeMarkdownV2(
                convertToTinySubscript(processCaption(item.caption.slice(0, 90), ""))
              )}*](https://t.me/${env.botUserName}?start=${item.messageId}-ong)\n`
          )
          .join("\n");

        const messageText = formattedLinks;

        await telegram.app.telegram.sendPhoto(chat, photo, {
          caption: messageText,
          parse_mode: "MarkdownV2",
          reply_markup: keyboard.makeBackupButton(),
        });

        console.log(`Sent message with ${chunk.length} links`);
      }
    } else {
      return;
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

export async function sendToLogGroup(chat: any, caption: string): Promise<void> {
  try {
    await telegram.app.telegram.sendMessage(chat, caption || "", {
      parse_mode: "Markdown",
    });
    console.log("log sent successfully!");
  } catch (error) {
    console.error("Error sending log:", error);
  }
}
