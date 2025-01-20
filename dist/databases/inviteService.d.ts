import { IUserDocument } from "./models/inviteModel.js";
export declare class InviteService {
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<IUserDocument | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
    getTopInviters(): Promise<{
        userId: string;
        inviteCount: number;
    }[]>;
    resetUserInvites(userId: string): Promise<void>;
    updateInviteUsed(userId: string, newUsedInvites: number): Promise<boolean>;
    getInviteStatus(userId: string): Promise<{
        totalInvites: number;
        usedInvites: number;
        remainingInvites: number;
    } | null>;
}
