import { delay } from "../extra/delay.js";
import env from "../services/env.js";
import telegram from "../services/telegram.js";
import logger from "./logger.js";
export async function getPhotoUrl(photoId) {
    let success = false;
    let photo;
    while (!success) {
        try {
            const result = await telegram.app.telegram.sendPhoto(env.dbPosterID, photoId);
            await delay(1000, 4100);
            photo = `${env.dbPosterLink}/${result.message_id}`;
            success = true;
        }
        catch (error) {
            success = false;
            if (error.code === 429) {
                logger.warn(`Rate limit error (429) in getPhotoUrl: ${error}`);
                await delay(40000, 41000);
            }
            else {
                logger.error(`Error in getPhotoUrl: ${error}`);
                await delay(40000, 41000);
            }
        }
    }
    return photo || "";
}
