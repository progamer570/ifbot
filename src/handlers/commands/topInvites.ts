import { WizardContext } from "telegraf/typings/scenes";
import database from "../../services/database.js";

export default async function addAIOHandler(ctx: WizardContext) {
  try {
    const topInviters: {
      userId: string;
      inviteCount: number;
    }[] = await database.getTopInviters();

    if (!topInviters || topInviters.length === 0) {
      await ctx.reply("❌ No invites found.");
      return;
    }

    const topInvitersString = topInviters
      .map((inviter, index) => {
        const { userId, inviteCount } = inviter;

        return `${index + 1}. ${userId || "Unknown User"} (Invites: ${inviteCount})`;
      })
      .join("\n");

    const resultString = `🏆 Top Inviters 🏆\n\n${topInvitersString}\n\n`;

    await ctx.reply(`\`\`\`\n${resultString}\n\`\`\``, { parse_mode: "Markdown" });
  } catch (error) {
    console.error("Error displaying top inviters:", error);
    await ctx.reply("❌ An error occurred while fetching the leaderboard.");
  }
}
