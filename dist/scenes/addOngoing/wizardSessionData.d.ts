import { WizardSessionData } from "telegraf/typings/scenes";
export interface AIOSessionData extends WizardSessionData {
    aIOTitles?: string[];
    backupChannel?: string;
    file?: string;
    msgId?: number[];
    aIOPosterID?: string;
    aIOPosterIDDone?: boolean;
    done?: boolean;
    captions?: string[];
}
