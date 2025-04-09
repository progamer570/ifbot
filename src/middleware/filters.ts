import { Context, Markup } from "telegraf";
import env from "../services/env.js";
import { getSystemUsage, getSystemUsageDetails } from "../extra/systemUses.js";
import { Message } from "telegraf/typings/core/types/typegram";
import auth from "../services/auth.js";
import database from "../services/database.js";
import { autoReplyMemory } from "../handlers/commands/autoReact.js";
import {
  developerInfo,
  escapeMarkdownV2,
  getInviteMessage,
  getRandomReactionEmoji,
  helpMessage,
  premiumPlan,
} from "../utils/helper.js";
import telegram from "../services/telegram.js";
import { FmtString } from "telegraf/format.js";

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
          case "/addsort":
            await handleUpdateFirstAndActive(ctx, args);
            break;
          case "/deletesort":
            await deleteSort(ctx);
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
    if (autoReplyMemory[ctx.from?.id!]) {
      setTimeout(async () => {
        await ctx.react(getRandomReactionEmoji()).catch((error) => {
          console.error("Failed to react:", error);
        });
      }, 60000);
    }

    if (ctx.message && containsSGD(ctx.message)) {
      try {
        setTimeout(async () => {
          await ctx.deleteMessage(ctx.message?.message_id).catch((error) => {
            console.error("Failed to delete message:", error);
          });
        }, 200000);
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
              message = "";
          }
          if (message) await ctx.reply(message);
        } catch (err) {
          console.log("Error handling callback:", err);
        }
      }
    }

    // callback query handlers
    if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
      const callbackData = ctx.callbackQuery.data;
      try {
        let message: string | FmtString = "?";
        const firstName = (
          ctx.message?.from.first_name?.replace(/[^a-zA-Z0-9]/g, "") || "User"
        ).trim();

        switch (callbackData) {
          case "features":
            message = helpMessage;
            break;
          case "seeplans":
            message = premiumPlan;
            break;
          case "about":
            message = developerInfo;
            break;
          case "refer":
            message = getInviteMessage(
              ctx.callbackQuery?.from?.first_name || "user",
              ctx.callbackQuery?.from.id.toString() || ""
            );
            break;
          case "home":
            message = "home";
            break;
        }

        if (message) {
          if (message === "home") {
            const homeMessage = `👋 ʜᴇʟʟᴏ ${firstName}!
            ɪ ᴀᴍ ᴀ ᴘᴏᴡᴇʀꜰᴜʟ ʙᴏᴛ ᴛʜᴀᴛ ᴡᴏʀᴋs ɪɴ ɢʀᴏᴜᴘs. 
            ${escapeMarkdownV2(env.request)}\n`;
            const groupLink = await telegram
              .getInviteLink(env.allowGroups[0])
              .catch((error) => console.log(error));
            const homeKeyboard = Markup.inlineKeyboard([
              [
                Markup.button.url(
                  "📌 Send Your Request Name Here 📌",
                  groupLink || "https://t.me/kdrama_cht"
                ),
              ],
              [
                Markup.button.callback("🛠 ʜᴇʟᴘ", "features"),
                Markup.button.callback("💌 ᴀʙᴏᴜᴛ", "about"),
              ],
              [
                Markup.button.callback("🎟 ᴘʀᴇᴍɪᴜᴍ", "seeplans"),
                Markup.button.callback("🎁 ʀᴇғᴇʀ", "refer"),
              ],
            ]);

            await ctx
              .editMessageText(homeMessage, {
                parse_mode: "HTML",
                reply_markup: homeKeyboard.reply_markup,
              })
              .catch((e) => console.log(e));
          } else {
            const backKeyboard = Markup.inlineKeyboard([
              [Markup.button.callback("🔙 Home", "home")],
            ]);

            await ctx
              .editMessageText(message || "Welcome", {
                parse_mode: "Markdown",
                reply_markup: backKeyboard.reply_markup,
                link_preview_options: { is_disabled: true },
              })
              .catch((e) => console.log(e));
          }
        }
      } catch (err) {
        console.log("Error handling callback:", err);
      }

      try {
        if (callbackData.startsWith("unlockpremium")) {
          const inviteStatus = await database.getInviteStatus(ctx.from?.id.toString() || "");

          if (inviteStatus) {
            let remainingInvites = inviteStatus.remainingInvites;

            if (remainingInvites <= 7) {
              await ctx.reply(
                "You don't have enough invites to unlock premium features. Minimum 7 invites required to unlock premium features."
              );
              return;
            }

            const success = await database.updateInviteUsed(
              (ctx.from?.id || 0).toString(),
              remainingInvites
            );
            const result = await database.addBotPremium(
              ctx.from?.id.toString() || "0",
              `${remainingInvites}d`
            );

            await ctx.reply(`[${ctx.from?.first_name}](tg://user?id=${ctx.from?.id})\n${result}`, {
              parse_mode: "Markdown",
            });

            if (success) {
              await ctx.reply(
                `You have successfully unlocked premium features for ${remainingInvites} days.`
              );
            }
          } else {
            console.log("No valid invite data found");
          }
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
    if (ctx.chat?.id !== undefined) {
      if (ctx.chat.type === "private" || env.allowGroups.includes(ctx.chat.id)) {
        next();
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
async function deleteSort(ctx: Context) {
  const success = await database.deleteAllSortData();
  await ctx.reply(success ? "Deleted successfully" : "Failed to delete Sort.");
}
