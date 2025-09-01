import getRandomId from "../../extra/getRandomId.js";
export default async function getDramadata(dramaDetails, messageIds, status) {
    try {
        return {
            shareId: getRandomId(),
            messageIds: messageIds || [],
            aIOTitle: dramaDetails.aIOTitle || "",
            aIOPosterID: dramaDetails.aIOPosterID || "0",
            status: status || "ongoing",
        };
    }
    catch (error) {
        return null;
    }
}
