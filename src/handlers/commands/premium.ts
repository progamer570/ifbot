import { CommandContext } from "../../interfaces.js";
import database from "../../services/database.js";

export default async function replyHandler(ctx: CommandContext) {
  try {
    const userId = ctx.from?.id;

    const premiumDetails = database.getPremiumDetails(userId.toString());
    const premiumDetailsString = JSON.stringify(premiumDetails, null, 2);
    await ctx.reply(`${premiumDetailsString}`);
  } catch (err) {
    console.error("Error handling reply command:", err);
  }
}
