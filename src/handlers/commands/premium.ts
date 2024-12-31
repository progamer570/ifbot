import { CommandContext } from "../../interfaces.js";
import database from "../../services/database.js";

export default async function replyHandler(ctx: CommandContext) {
  try {
    const userId = ctx.from?.id;

    const premiumDetails = database.getPremiumDetails(userId.toString());
    await ctx.reply(`${premiumDetails}`);
  } catch (err) {
    console.error("Error handling reply command:", err);
  }
}
