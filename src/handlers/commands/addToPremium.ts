import { CommandContext } from "../../interfaces.js";
import auth from "../../services/auth.js";
import database from "../../services/database.js";
import { hasReplyToMessage, isTextMessage } from "../../utils/helper.js";
import logger from "../../utils/logger.js";

export default async function addToPremiumHandler(ctx: CommandContext) {
  const userId = ctx.from?.id;
  const firstName = ctx.from?.first_name || "user";
  const args = isTextMessage(ctx.message) ? ctx.message.text.split(" ") : null;

  let addUserToPremium = "";
  let duration = "";
  if (!auth.isOwner(userId) || !userId) {
    await ctx.reply("Sorry, you have no permission to do this");
    return;
  }
  if (!args || args.length < 1) {
    await ctx.reply(
      "Please specify the day duration (e.g., /addtopremium 1d or /addtopremium userid 1d [for days])."
    );
    return;
  }
  if (args.length === 3) {
    addUserToPremium = args[1];
    duration = args[2];
  } else {
    if (!hasReplyToMessage(ctx.message)) {
      await ctx.reply("Please reply to a user message to enable autoreply.");
      return;
    }
    const replyToMessage = ctx.message.reply_to_message;
    addUserToPremium = replyToMessage.from.id;
    duration = args[1];
  }

  try {
    const result = await database.addBotPremium(addUserToPremium.toString(), duration);
    await ctx.reply(`[${addUserToPremium}](tg://user?id=${addUserToPremium})\n${result}`, {
      parse_mode: "Markdown",
    });
  } catch (err) {
    logger.error("Error adding to premium:", err);
  }
}
