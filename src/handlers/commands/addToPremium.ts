import { CommandContext } from "../../interfaces.js";
import auth from "../../services/auth.js";
import database from "../../services/database.js";
import { hasReplyToMessage, isTextMessage } from "../../utils/helper.js";

export default async function addToPremiumHandler(ctx: CommandContext) {
  const userId = ctx.from?.id;
  const firstName = ctx.from?.first_name || "user";
  const args = isTextMessage(ctx.message) ? ctx.message.text.split(" ") : null;

  let addToUserToPremium = "";
  let duration = "";
  if (!auth.isOwner(userId) || !userId) {
    await ctx.reply("Sorry, you have no permission to do this");
    return;
  }
  if (!args || args.length > 2) {
    await ctx.reply(
      "Please specify the day duration (e.g., /addtopremium 1d or /addtopremium userid 1d [for days])."
    );
    return;
  }
  if (args.length === 3) {
    addToUserToPremium = args[1];
    duration = args[2];
  } else {
    if (!hasReplyToMessage(ctx.message)) {
      await ctx.reply("Please reply to a user message to enable autoreply.");
      return;
    }
    const replyToMessage = ctx.message.reply_to_message;
    addToUserToPremium = replyToMessage.from.id;
    duration = args[1];
  }

  try {
    const result = await database.addBotPremium(addToUserToPremium.toString(), duration);
    await ctx.reply(`[${firstName}](tg://user?id=${userId})${result}`, {
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.log(err);
  }
}
