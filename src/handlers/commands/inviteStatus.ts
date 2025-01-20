import { WizardContext } from "telegraf/typings/scenes";
import auth from "../../services/auth.js";
import { generateInviteLink } from "../../utils/helper.js";
import database from "../../services/database.js";

export default async function inviteStatusHandler(ctx: WizardContext): Promise<void> {
  try {
    const userId = ctx.from?.id?.toString();
    const userName = ctx.from?.username || ctx.from?.first_name || "Unknown User";

    // Validate if user ID is available
    if (!userId) {
      await ctx.reply("❌ Unable to retrieve your user information. Please try again.");
      return;
    }

    // Check if the message is a reply
    // if (!hasReplyToMessage(ctx.message)) {
    //   await ctx.reply("ℹ️ Please reply to a user's message to view their invite status.");
    //   return;
    // }

    // Extract the replied-to user's information
    // const replyToMessage = ctx.message.reply_to_message;
    // const replyToUserId = replyToMessage?.from?.id?.toString();

    // if (!replyToUserId) {
    //   await ctx.reply("❌ Unable to fetch the replied-to user's information.");
    //   return;
    // }

    // Fetch invite status
    const inviteStatus = await database.getInviteStatus(userId.toString());

    if (!inviteStatus) {
      await ctx.reply(`ℹ️ Invite status not found for the user.`);
      return;
    }

    // Reply with the formatted invite status
    const { totalInvites, usedInvites, remainingInvites } = inviteStatus;
    const inviteLink = generateInviteLink(userId, false);
    const shareInviteLink = generateInviteLink(userId, true);
    const responseMessage = `
📊  Invite Status for ${userName}:
-   Total Invites: ${totalInvites}
-   Used Invites: ${usedInvites}
-   Remaining Invites: ${remainingInvites}
-   your invite link: ${inviteLink}
`;

    await ctx.reply(responseMessage.trim(), {
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Unlock premium with your invites!",
              callback_data: `unlockpremium-${remainingInvites}`,
            },
          ],
          [
            {
              text: "Invite your friends",
              url: shareInviteLink,
            },
          ],
        ],
      },
    });
  } catch (error) {
    await ctx.reply("⚠️ An unexpected error occurred. Please try again later.");
  }
}
