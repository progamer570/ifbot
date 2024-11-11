import { WizardSessionData } from "telegraf/typings/scenes";
import { AIODocument } from "../../databases/interfaces/aIO.js";
export default interface PageSessionData extends WizardSessionData {
    page?: number;
    prev?: string;
    next?: string;
    hindi?: boolean;
    aIOData?: AIODocument[];
}
