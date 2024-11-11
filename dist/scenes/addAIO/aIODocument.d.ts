import { AIODocument } from "../../databases/interfaces/aIO.js";
interface AIODetails {
    aIOTitle?: string;
    backupChannel?: string;
    totalEpisodes?: string;
    file?: string;
    messageIds?: number[];
    aIOPosterID?: string;
}
export default function getDramadata(dramaDetails: AIODetails, messageIds: number[]): Promise<AIODocument | null>;
export {};
