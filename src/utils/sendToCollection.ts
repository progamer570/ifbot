import telegram from "./../services/telegram.js";
import * as keyboard from "./markupButton/permanantButton/keyboard.js";

export async function sendToCOllection(
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
