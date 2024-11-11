import { Context } from "telegraf";
import env from "../services/env.js";
import { getSystemUsage, getSystemUsageDetails } from "../extra/systemUses.js";
import { Message } from "telegraf/typings/core/types/typegram";

export default {
  private(ctx: Context, next: () => void) {
    console.log(ctx.chat?.id);
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/systemuses") {
      try {
        ctx.reply(
          "System uses by : " +
            getSystemUsageDetails() +
            "System uses by machine:" +
            getSystemUsage()
        );
      } catch {}
    }

    if (ctx.chat?.id !== undefined) {
      if (ctx.chat.type === "private" || env.allowGroups.includes(ctx.chat.id)) {
        next();
      }
    }
    if (ctx.message && containsSGD(ctx.message)) {
      try {
        setTimeout(async () => {
          await ctx.deleteMessage(ctx.message?.message_id).catch((error) => {
            console.error("Failed to delete message:", error);
          });
        }, 300000);
      } catch (error) {
        console.error("Unexpected error while deleting message:", error);
      }
    }
  },
};
function containsSGD(message: Message): boolean {
  return (
    (message as Message.AnimationMessage).animation !== undefined ||
    (message as Message.StickerMessage).sticker !== undefined ||
    (message as Message.DocumentMessage).document !== undefined
  );
}
