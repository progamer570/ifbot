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
    if (payload) {
      const inviteParts = payload.split("-");
      if (payload.includes("invite") && inviteParts.length > 1) {
        const inviterId = inviteParts[1];
        const userId = ctx.from?.id.toString();
        if (userId && inviterId && userId !== inviterId) {
          const isUserExist = await database.isUserExist(userId);
          if (!isUserExist) {
            await addInviteUser(inviterId, userId, user.username || "null");
            await ctx.reply(`Welcome! You were invited by a user with ID ${inviterId}.
Join our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.
Click the link to join and start enjoying now!\n${env.join}\n\n`);
          }
        }
      } else {
        const parts: string[] = payload.split("-");
        if (parts.length > 0) {
          shareId = Number(parts[0]);
        }
      }
    }
    if (!shareId) {
      return ctx.reply(
        `Hello ${user.first_name}!\n${
          env.request
        }\n\n\nInvite your friends your invite link is:\n${generateInviteLink(
          userId.toString(),
          false
        )}`,
        {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "HTML",
        }
      );
    }

    if (!auth.isAdmin(userId)) {
      const chatsUserHasNotJoined = await telegram.getChatsUserHasNotJoined(userId);
      if (chatsUserHasNotJoined.length) {
        return telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined);
      }
    }

    let messageIds: number[] | undefined;
    let channel: number | undefined;

    const canRequest = await database.canRequest(userId.toString());

    if (canRequest || env.adminIds.includes(userId)) {
      try {
        await database.useRequest(userId.toString());
      } catch (error) {}
      if (payload.includes("eng")) {
        messageIds = await database.getAIOMessages(Number(shareId));
        channel = env.dbAIOChannelId;
      }
      if (payload.includes("hindi")) {
        messageIds = await database.getHindiMessages(Number(shareId));
        channel = env.dbAIOChannelId;
      }
      if (payload.includes("ong")) {
        messageIds = await database.getOngoingMessages(Number(shareId));
        channel = env.dbOngoingChannelId;
      }

      if (!messageIds) {
        return ctx.reply("Message not found, try another link", {
          reply_to_message_id: ctx.message.message_id,
        });
      }
      if (!channel) {
        throw Error("There must be DB_CHANNEL_ID and DB_MOVIE_CHANNEL_ID");
      }
      await telegram.forwardMessages(chatId, channel, messageIds, true);
      try {
        await database.saveUser(user);
      } catch {}
    } else {
      return ctx.reply(
        `Hello ${
          user?.first_name
        }!\n In 1 day, you can only make 5 request. Increase your limit by inviting users. \nIt will increase your request limit by per day per user by 1\n your invite link is: "${generateInviteLink(
          userId.toString(),
          false
        )}`,
        {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "HTML",
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export const generateInviteLink = (userId: string, sharLink: boolean) => {
  if (sharLink) {
    return `https://t.me/share/url?url=https://t.me/${env.botUserName}?start=invite-${userId}`;
    //
  } else {
    return `https://t.me/${env.botUserName}?start=invite-${userId}`;
  }
};
const addInviteUser = async (inviterId: string, newUserId: string, username: string) => {
  await database.addInvite(inviterId, newUserId, username);
};
