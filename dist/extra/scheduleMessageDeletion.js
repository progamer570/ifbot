import logger from "../utils/logger.js";
export function scheduleMessageDeletion(bot, chatId, messageId, delayInMinutes) {
    setTimeout(async () => {
        try {
            await bot.app.telegram.deleteMessage(chatId, messageId);
            logger.info("Message deleted successfully.");
        }
        catch (error) {
            logger.error("Error deleting message:", error);
        }
    }, delayInMinutes * 60 * 1000);
}
