import { OngoingDocument } from "../../databases/interfaces/ongoingDocument.js";
interface AIODetails {
    aIOTitle?: string;
    backupChannel?: string;
    totalEpisodes?: string;
    file?: string;
    messageIds?: number[];
    aIOPosterID?: string;
}
export default function getDramadata(dramaDetails: AIODetails, messageIds: number[]): Promise<OngoingDocument | null>;
export {};
