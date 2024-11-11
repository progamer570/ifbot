import { WizardSessionData } from "telegraf/typings/scenes";
export default interface PageSessionData extends WizardSessionData {
    page?: number;
    prev?: string;
    next?: string;
    id?: string;
    totalInvites?: string;
    inviteData?: string[];
}
