import auth from "../../services/auth.js";
import { hasReplyToMessage, isTextMessage } from "../../utils/helper.js";
import logger from "../../utils/logger.js";
export const autoReplyMemory = {};
const cleanupMemory = () => {
    const now = Date.now();
    for (const userId in autoReplyMemory) {
        if (autoReplyMemory[userId].expiry <= now) {
            delete autoReplyMemory[userId];
        }
    }
};
export default async function autoReactHandler(ctx) {
    try {
        const userId = ctx.from?.id || 2;
        if (!auth.isAdmin(userId)) {
            await ctx.reply("Sorry, you have no permission to do this");
            return;
        }
        const userName = ctx.from?.username || ctx.from?.first_name || "Unknown User";
        if (!hasReplyToMessage(ctx.message)) {
            await ctx.reply("Please reply to a user message to enable autoreply.");
            return;
        }
        const replyToMessage = ctx.message.reply_to_message;
        const replyToUserId = replyToMessage.from.id;
        // Ensure a valid duration argument
        const args = isTextMessage(ctx.message) ? ctx.message.text.split(" ") : null;
        if (!args || args.length < 2) {
            await ctx.reply("Please specify the time duration (e.g., /autoreply 1h).");
            return;
        }
        const duration = args[1];
        const match = duration.match(/^(\d+)([smhd])$/);
        if (!match) {
            await ctx.reply("Invalid duration format. Use s (seconds), m (minutes), h (hours), d (days).");
            return;
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        let durationMs;
        // Convert to milliseconds
        switch (unit) {
            case "s":
                durationMs = value * 1000;
                break;
            case "m":
                durationMs = value * 60 * 1000;
                break;
            case "h":
                durationMs = value * 60 * 60 * 1000;
                break;
            case "d":
                durationMs = value * 24 * 60 * 60 * 1000;
                break;
            default:
                await ctx.reply("Invalid time unit. Use s, m, h, or d.");
                return;
        }
        // Cleanup memory and check if it's full
        cleanupMemory();
        if (Object.keys(autoReplyMemory).length >= 10) {
            await ctx.reply("Memory is full. Please wait for an entry to expire or clear memory.");
            return;
        }
        // Store the auto-reply entry in memory
        autoReplyMemory[replyToUserId] = {
            userName,
            expiry: Date.now() + durationMs,
        };
    }
    catch (error) {
        logger.error("Error in autoReactHandler:", error);
        await ctx.reply("An unexpected error occurred. Please try again later.");
    }
}
