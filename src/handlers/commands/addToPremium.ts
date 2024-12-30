import { CommandContext } from "../../interfaces.js";
import auth from "../../services/auth.js";
import database from "../../services/database.js";

export default async function addToPremiumHandler(ctx: CommandContext) {
  const userId = ctx.from?.id;
  const firstName = ctx.from?.first_name || "user";
  if (!auth.isOwner(userId) || !userId) {
    await ctx.reply("Sorry, you have no permission to do this");
    return;
  }
  try {
    const duration = ctx.message.text.replace("/addtopremium", "").trim();
    const result = await database.addBotPremium(userId.toString(), duration);
    await ctx.reply(`[${firstName}](tg://user?id=${userId})${result}`, {
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.log(err);
  }
}
