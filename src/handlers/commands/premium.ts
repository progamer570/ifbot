import { CommandContext } from "../../interfaces.js";
import database from "../../services/database.js";
import logger from "../../utils/logger.js";

export default async function replyHandler(ctx: CommandContext) {
  try {
    const userId = ctx.from?.id;

    const premiumDetails = await database.getPremiumDetails(userId.toString());
    await ctx.reply(`${premiumDetails}`, {
      parse_mode: "Markdown",
    });
  } catch (err) {
    logger.error("Error handling premium command:", err);
  }
}
