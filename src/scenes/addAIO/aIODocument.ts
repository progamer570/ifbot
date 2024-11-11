import { AIODocument } from "../../databases/interfaces/aIO.js";
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
  messageIds: number[]
): Promise<AIODocument | null> {
  try {
    const sortData = await database.removeFirstItem();

    if (!sortData) {
      throw new Error("Failed to retrieve sort data");
    }

    const shareId = sortData.shareId;
    const sortLink: string = sortData.aioShortUrl;

    return {
      shareId: shareId,
      messageIds: messageIds || [],
      aIOTitle: dramaDetails.aIOTitle || "",
      aIOPosterID: dramaDetails.aIOPosterID || "0",
      aioShortUrl: sortLink || "null",
      episodes: [
        { episodeNumber: 1, shortUrl: "DummyLink1", teleUrl: "DummyURL1" },
        { episodeNumber: 2, shortUrl: "DummyLink2", teleUrl: "DummyURL2" },
      ],
    };
  } catch (error) {
    return null;
  }
}
