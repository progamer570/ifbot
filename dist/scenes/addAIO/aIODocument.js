import getRandomId from "../../extra/getRandomId.js";
export default async function getDramadata(dramaDetails, messageIds) {
    try {
        return {
            shareId: getRandomId(),
            messageIds: messageIds || [],
            aIOTitle: dramaDetails.aIOTitle || "",
            aIOPosterID: dramaDetails.aIOPosterID || "0",
            aioShortUrl: "null",
            episodes: [
                { episodeNumber: 1, shortUrl: "DummyLink1", teleUrl: "DummyURL1" },
                { episodeNumber: 2, shortUrl: "DummyLink2", teleUrl: "DummyURL2" },
            ],
        };
    }
    catch (error) {
        return null;
    }
}
