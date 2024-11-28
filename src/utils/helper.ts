import { User } from "telegraf/typings/core/types/typegram.js";
import env from "../services/env.js";
import { CommandContext } from "../interfaces.js";

export async function sendTokenExpiredMessage(
  ctx: CommandContext,
  user: User,
  shortUrl: string,
  payload: string
): Promise<void> {
  const firstName = (user.first_name?.replace(/[^a-zA-Z0-9]/g, "") || "User").trim();
  const message = `Hello ${firstName}, your token has expired.
You can generate a new token once a day. After that, you can make unlimited requests within 24 hours.
ANY PROBLEM CONTACT: [ADMIN](tg://user?id=${env.adminIds[0]})`;

  await ctx.reply(message, {
    reply_to_message_id: ctx.message.message_id,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Click Me To Generate New Token",
            url: shortUrl,
          },
        ],
        [
          {
            text: "Try Again",
            url: `https://t.me/${env.botUserName}?start=${payload}`.replace(" ", ""),
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

export async function sendInviteMessage(
  ctx: CommandContext,
  user: User,
  userId: string
): Promise<void> {
  const firstName = (user.first_name?.replace(/[^a-zA-Z0-9]/g, "") || "User").trim();
  const inviteLink = generateInviteLink(userId, false);
  const message = `Hello ${firstName}!\n${env.request}\n\n\nInvite your friends! Your invite link is:\n${inviteLink}`;

  await ctx.reply(message, {
    reply_to_message_id: ctx.message.message_id,
    parse_mode: "HTML",
  });
}

export async function sendDailyLimitMessage(
  ctx: CommandContext,
  user: User,
  userId: string
): Promise<void> {
  const firstName = (user.first_name?.replace(/[^a-zA-Z0-9]/g, "") || "User").trim();
  const inviteLink = generateInviteLink(userId, false);
  const message = `Hello ${firstName}!
You can make up to 5 requests per day. Increase your limit by inviting users! Each user adds 1 extra daily request.
Your invite link is: "${inviteLink}"`;

  await ctx.reply(message, {
    reply_to_message_id: ctx.message.message_id,
    parse_mode: "HTML",
  });
}
export async function sendInviterWelcomeMessage(
  ctx: CommandContext,
  inviterId: string
): Promise<void> {
  const message = `Welcome! You were invited by a user with ID ${inviterId}.
Join our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.
Click the link to join and start enjoying now!\n${env.join}\n\n`;

  await ctx.reply(message);
}
export async function sendTokenGeneratedMessage(ctx: CommandContext, token: string): Promise<void> {
  const truncatedToken = `${token.slice(0, 5)} ...`;
  const message = `Your new token is generated: ${truncatedToken},\nNow click on the Try Again button 👆👆!`;

  await ctx.reply(message);
}
export const generateInviteLink = (userId: string, sharLink: boolean) => {
  if (sharLink) {
    return `https://t.me/share/url?url=https://t.me/${env.botUserName}?start=invite-${userId}`;
  }
  return `https://t.me/${env.botUserName}?start=invite-${userId}`;
};
