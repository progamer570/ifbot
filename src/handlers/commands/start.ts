import { CommandContext } from "../../interfaces.js";
import auth from "../../services/auth.js";
import database from "../../services/database.js";
import env from "../../services/env.js";
import telegram from "../../services/telegram.js";

export default async function startHandler(ctx: CommandContext) {
  const chatId = ctx.chat.id;
  const user = ctx.from;
  const userId = user.id;
  const payload: string = ctx.message.text.split(" ")[1];
  let shareId: number | undefined = undefined;

  try {
    // Handle token generation
    if (payload && payload.includes("token-")) {
      const tokenNumber = payload.replace("token-", "");
      const firstSortItem = await database.getFirstSortItem();

      if (firstSortItem) {
        const activeShareId = firstSortItem.currentActivePath;

        if (tokenNumber === activeShareId) {
          const { token } = await database.manageToken(userId.toString());
          return await ctx.reply(`Your token is: ${token}`);
        }
      }
    }
    // Handle invite
    if (payload) {
      const inviteParts = payload.split("-");
      if (payload.includes("invite") && inviteParts.length > 1) {
        const inviterId = inviteParts[1];
        const newUserId = userId.toString();

        if (newUserId && inviterId && newUserId !== inviterId) {
          const isUserExist = await database.isUserExist(newUserId);
          if (!isUserExist) {
            await addInviteUser(inviterId, newUserId, user.username || "null");
            return await ctx.reply(
              `Welcome! You were invited by a user with ID ${inviterId}.
Join our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.
Click the link to join and start enjoying now!\n${env.join}\n\n`
            );
          }
        }
      } else {
        const parts = payload.split("-");
        if (parts.length > 0) {
          shareId = Number(parts[0]);
        }
      }
    }

    // Default message if no shareId is found
    if (!shareId) {
      return ctx.reply(
        `Hello ${user.first_name}!\n${
          env.request
        }\n\n\nInvite your friends! Your invite link is:\n${generateInviteLink(
          userId.toString(),
          false
        )}`,
        {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "HTML",
        }
      );
    }

    // Non-admin users must join chats
    if (!auth.isAdmin(userId)) {
      const chatsUserHasNotJoined = await telegram.getChatsUserHasNotJoined(userId);
      if (chatsUserHasNotJoined.length) {
        return telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined);
      }
    }

    // Token validation
    const isValidToken = await database.verifyAndValidateToken(userId.toString());
    if (!isValidToken) {
      const firstItem = await database.getFirstItem();
      if (firstItem) {
        return await ctx.reply(
          `Hello ${user.first_name}, your token has expired.
You can generate a new token once a day. After that, you can make unlimited requests within 24 hours.
ANY PROBLEM CONTACT: [ADMIN](tg://user?id=${env.adminIds[0]})`,
          {
            reply_to_message_id: ctx.message.message_id,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Click Me To Generate New Token",
                    url: firstItem.sort[0].aioShortUrl,
                  },
                ],
              ],
            },
            parse_mode: "Markdown",
          }
        );
      }
    }

    // Handle content requests
    const canRequest = await database.canRequest(userId.toString());
    if (canRequest || env.adminIds.includes(userId)) {
      try {
        await database.useRequest(userId.toString());
      } catch (error) {
        console.error("Error updating request count:", error);
      }

      let messageIds;
      let channel;

      if (payload.includes("eng")) {
        messageIds = await database.getAIOMessages(Number(shareId));
        channel = env.dbAIOChannelId;
      } else if (payload.includes("hindi")) {
        messageIds = await database.getHindiMessages(Number(shareId));
        channel = env.dbAIOChannelId;
      } else if (payload.includes("ong")) {
        messageIds = await database.getOngoingMessages(Number(shareId));
        channel = env.dbOngoingChannelId;
      }

      if (!messageIds) {
        return ctx.reply("Message not found, try another link", {
          reply_to_message_id: ctx.message.message_id,
        });
      }
      if (!channel) {
        throw new Error("Missing DB_CHANNEL_ID or DB_MOVIE_CHANNEL_ID");
      }

      await telegram.forwardMessages(chatId, channel, messageIds, true);
      try {
        await database.saveUser(user);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      return ctx.reply(
        `Hello ${user.first_name}!
You can make up to 5 requests per day. Increase your limit by inviting users! Each user adds 1 extra daily request.
Your invite link is: "${generateInviteLink(userId.toString(), false)}"`,
        {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "HTML",
        }
      );
    }
  } catch (error) {
    console.error("Error in startHandler:", error);
  }
}

export const generateInviteLink = (userId: string, sharLink: boolean) => {
  if (sharLink) {
    return `https://t.me/share/url?url=https://t.me/${env.botUserName}?start=invite-${userId}`;
  }
  return `https://t.me/${env.botUserName}?start=invite-${userId}`;
};

const addInviteUser = async (inviterId: string, newUserId: string, username: string) => {
  await database.addInvite(inviterId, newUserId, username);
};
