import { WizardContext } from "telegraf/typings/scenes";
import { thankReply } from "../../utils/markupButton/permanantButton/lists.js";
import env from "../../services/env.js";

export default async function reqAIOHandler(ctx: WizardContext, next: () => void) {
  if (ctx.message && "text" in ctx.message) {
    const id = ctx.chat?.id;
    const text = ctx.message.text;

    try {
      if (!/^\/(start|d|m|a)/i.test(text) && !/(?<!\S)[.!@#$%^&*()](?!\S)/.test(text)) {
        if (
          env.withoutCmd.includes(id!) &&
          text.length > 4 &&
          !text.startsWith("/s") &&
          !text.startsWith("/h")
        ) {
          await ctx.scene.enter("reqAIO");
        } else if (text.startsWith("/s") || text.startsWith("/h")) {
          await ctx.scene.enter("reqAIO");
        } else if (
          !ctx.message.reply_to_message &&
          !text.includes("@") &&
          !text.includes("/") &&
          text.length > 4 &&
          !containsEmoji(text)
        ) {
          await ctx.scene.enter("reqAIO");
        }
      }

      if (thankReply(text)) {
        await ctx
          .reply(
            `If you really want to thank me so add two members for me\nhere my official Channel for updates and backup ${
              "@" + env.join
            }`
          )
          .then((sentMessage) => {
            try {
              const messageIdToDelete = sentMessage.message_id;
              setTimeout(() => {
                ctx.deleteMessage(messageIdToDelete);
              }, 1 * 60 * 1000);
            } catch {}
          });
      }
    } catch (error) {}
  }
  next();
}
function containsEmoji(str: string): boolean {
  const emojiPattern: RegExp =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  return emojiPattern.test(str);
}
