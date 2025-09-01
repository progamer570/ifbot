import env from "../services/env.js";
import telegram from "./../services/telegram.js";
import { processCaption } from "./caption/editCaption.js";
import { convertToTinySubscript, escapeMarkdownV2 } from "./helper.js";
import * as keyboard from "./markupButton/permanantButton/keyboard.js";
import database from "../services/database.js";
import logger from "./logger.js";

export async function sendToCollection(
  chat: any,
  aIOPosterID: string | undefined,
  link: string,
  caption: string
): Promise<void> {
  try {
    await telegram.app.telegram.sendPhoto(chat, aIOPosterID || "", {
      caption: `\`\n${caption}\n\``,
      parse_mode: "Markdown",
      reply_markup: keyboard.makeCollectionButton(link),
    });
    logger.info("Photo sent successfully!");
  } catch (error) {
    logger.error("Error sending photo:", error);
  }
}
export async function sendToCollectionOng(chat: any, link: string, caption: string): Promise<void> {
  try {
    await telegram.app.telegram.sendMessage(chat, `\`\`\`\n${caption}\n\`\`\`` || "", {
      parse_mode: "Markdown",
      reply_markup: keyboard.makeCollectionButton(link),
    });
    logger.info("Ongoing text message sent successfully!");
  } catch (error) {
    logger.error("Error sending ongoing text message:", error);
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
      logger.error("Error sending AIO poster:", error);
    }
  }
  try {
    if (shareId) {
      const photo = await database.getOngoingMessages(Number(shareId)).then((result) => {
        return result?.aIOPosterID || "";
      });
      if (!photo) {
        logger.error("AIO poster ID not found for ongoing messages.");
        return;
      }
      logger.info("Links for ongoing collection:", links);
      const chunkSize = 10;
      for (let i = 0; i < links.length; i += chunkSize) {
        const chunk = links.slice(i, i + chunkSize);
        const formattedLinks = chunk
          .map(
            (item) =>
              `[${escapeMarkdownV2(
                convertToTinySubscript(processCaption(item.caption.slice(0, 90), ""))
              )}](https://t.me/${env.botUserName}?start=${item.messageId}-ong)`
          )
          .join("\n\n");

        const messageText = formattedLinks;

        await telegram.app.telegram.sendPhoto(chat, photo, {
          caption: messageText,
          parse_mode: "MarkdownV2",
          reply_markup: keyboard.makeBackupButton(),
        });

        logger.info(`Sent ${chunk.length} links for ongoing collection.`);
      }
    } else {
      logger.info("Share ID not provided for sendToCollectionOng2, skipping link sending.");
      return;
    }
  } catch (error) {
    logger.error("Error in sendToCollectionOng2:", error);
  }
}

export async function sendToLogGroup(chat: any, caption: string): Promise<void> {
  try {
    await telegram.app.telegram.sendMessage(chat, caption || "", {
      parse_mode: "Markdown",
    });
    logger.info("Log message sent successfully!");
  } catch (error) {
    logger.error("Error sending log message:", error);
  }
}
