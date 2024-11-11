import { Context } from "telegraf";
import env from "../services/env.js";
import { getSystemUsage, getSystemUsageDetails } from "../extra/systemUses.js";
import { Message } from "telegraf/typings/core/types/typegram";
import auth from "../services/auth.js";

export default {
  async private(ctx: Context, next: () => void) {
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
    if (auth.isAdmin(ctx.from?.id ?? 0)) {
      if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
        const callbackData = ctx.callbackQuery.data;

        try {
          let message: string;

          switch (callbackData) {
            case "addDrama":
              message = "";
              break;
            case "addOngoing":
              message = "use /add to add new drama or series or movie";
              break;
            case "addHindi":
              message = "use /addh to add new hindi drama or series or movie";
              break;
            case "addOngoing":
              message = "use /addong to add ongoing drama or series or movie";
              break;
            case "search":
              message = "send uploaded drama or series or movie name ";
              break;

            default:
              message = "Unknown topic. Please try again.";
          }

          await ctx.reply(message);
        } catch (err) {
          console.log("Error handling callback:", err);
        }
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
