import { Context } from "telegraf";
import env from "../services/env.js";
import { getSystemUsage, getSystemUsageDetails } from "../extra/systemUses.js";
import { Message } from "telegraf/typings/core/types/typegram";
import auth from "../services/auth.js";
import database from "../services/database.js";

export default {
  async private(ctx: Context, next: () => void) {
    console.log(ctx.chat?.id);

    if (ctx.message && "text" in ctx.message && auth.isAdmin(ctx.from?.id ?? 0)) {
      const messageText = ctx.message?.text;

      const [command, ...args] = messageText.split(" ");

      try {
        switch (command) {
          case "/setLink":
            await handleSetLink(ctx, args);
            break;
          case "/getFirstItem":
            await handleGetFirstItem(ctx);
            break;
          case "/setActive":
            await handleSetActive(ctx, args);
            break;
          case "/updateFirstAndActive":
            await handleUpdateFirstAndActive(ctx, args);
            break;
          case "/systemuses":
            await handleSystemUses(ctx);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error handling command:", error);
        await ctx.reply("An error occurred while processing your request.");
      }
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
            case "editDrama":
              message = "use </edit drama name> to edit uploaded drama or series or movie";
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
            case "broadcast":
              message = "reply to the message /broadcast that you want to broadcast to your user";
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
async function handleSetLink(ctx: Context, args: string[]) {
  const [shareId, aioShortUrl] = args;
  if (!shareId || !aioShortUrl) {
    await ctx.reply("Usage: /setLink <shareId> <aioShortUrl>");
    return;
  }
  const success = await database.addLinkToFirstSort({
    shareId: Number(shareId),
    aioShortUrl,
  });
  await ctx.reply(success ? "Link added successfully!" : "Failed to add link.");
}

// Handle the "/getFirstItem" command
async function handleGetFirstItem(ctx: Context) {
  const firstItem = await database.getFirstSortItem();
  await ctx.reply(firstItem ? `First Item: ${JSON.stringify(firstItem)}` : "No items found.");
}

// Handle the "/setActive" command
async function handleSetActive(ctx: Context, args: string[]) {
  const [newActiveShareId] = args;
  if (!newActiveShareId) {
    await ctx.reply("Usage: /setActive <newActiveShareId>");
    return;
  }
  const success = await database.setActiveShareId(newActiveShareId);
  await ctx.reply(success ? "Active Share ID set successfully!" : "Failed to set Active Share ID.");
}

// Handle the "/updateFirstAndActive" command
async function handleUpdateFirstAndActive(ctx: Context, args: string[]) {
  const [shareId, aioShortUrl, newActiveShareId] = args;
  if (!shareId || !aioShortUrl || !newActiveShareId) {
    await ctx.reply("Usage: /updateFirstAndActive <shareId> <aioShortUrl> <newActiveShareId>");
    return;
  }
  const success = await database.updateFirstSortAndActivePath(
    { shareId: Number(shareId), aioShortUrl },
    newActiveShareId
  );
  await ctx.reply(
    success
      ? "First sort item and Active Share ID updated successfully!"
      : "Failed to update First sort item and Active Share ID."
  );
}

// Handle the "/systemuses" command
async function handleSystemUses(ctx: Context) {
  try {
    ctx.reply(
      "System uses by: " + getSystemUsageDetails() + "\nSystem uses by machine: " + getSystemUsage()
    );
  } catch (error) {
    console.error("Error fetching system usage:", error);
    await ctx.reply("Failed to retrieve system usage information.");
  }
}
