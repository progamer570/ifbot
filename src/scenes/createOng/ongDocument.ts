import { OngoingDocument } from "../../databases/interfaces/ongoingDocument.js";
import getRandomId from "../../extra/getRandomId.js";
import database from "../../services/database.js";

interface AIODetails {
  aIOTitle?: string;
  backupChannel?: string;
  totalEpisodes?: string;
  file?: string;
  messageIds?: number[];
  aIOPosterID?: string;
}

export default async function getDramadata(
  dramaDetails: AIODetails,
  messageIds: number[],
  status: string
): Promise<OngoingDocument | null> {
  try {
    return {
      shareId: getRandomId(),
      messageIds: messageIds || [],
      aIOTitle: dramaDetails.aIOTitle || "",
      aIOPosterID: dramaDetails.aIOPosterID || "0",
      status: status || "ongoing",
    };
  } catch (error) {
    return null;
  }
}
