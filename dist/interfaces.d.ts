import { NarrowedContext } from "telegraf";
import { Update, Message, User } from "telegraf/typings/core/types/typegram.js";
import { WizardContext, WizardSessionData } from "telegraf/typings/scenes/index.js";
import { AIOSearchCriteria } from "./databases/interfaces/searchCriteria.js";
import { SortDocument } from "./databases/interfaces/sort.js";
import { AIODocument } from "./databases/interfaces/aIO.js";
import { InviteUser } from "./databases/interfaces/inviteUser.js";
import { OngoingDocument } from "./databases/interfaces/ongoingDocument.js";
export type CommandContext = NarrowedContext<WizardContext<WizardSessionData>, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
}>;
export interface DatabaseClient {
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    saveSort(SortDocument: SortDocument): Promise<SortDocument>;
    saveUser(user: User): Promise<User>;
    isUserExist(user: string): Promise<boolean>;
    countUsers(): Promise<string>;
    saveAIO(aIODocument: AIODocument): Promise<AIODocument>;
    createOngoing(aIODocument: OngoingDocument): Promise<OngoingDocument>;
    addOngoing(shareId: number, messageIds: number[]): any;
    saveHindiDrama(aIODocument: AIODocument): Promise<AIODocument>;
    getHindiMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<number[] | undefined>;
    getOngoingMessages(shareId: number): Promise<OngoingDocument | undefined>;
    searchAIO(searchCriteria: AIOSearchCriteria, messageIdLink?: string | null): Promise<AIODocument[] | undefined>;
    searchHindiDrama(searchCriteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    addAIO(shareId: number, messageIds: number[]): any;
    deleteAIO(shareId: number): any;
    updateAIOAttribute(shareId: number, attribute: any): any;
    getFirstItem(): Promise<SortDocument | null>;
    getAllUserIds(): Promise<number[] | undefined>;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
    getTopInviters(): Promise<{
        userId: string;
        inviteCount: number;
    }[]>;
    updateInviteUsed(userId: string, newUsedInvites: number): Promise<boolean>;
    getInviteStatus(userId: string): Promise<{
        totalInvites: number;
        usedInvites: number;
        remainingInvites: number;
    } | null>;
    hasGeneratedToken(userId: string): Promise<boolean>;
    verifyAndValidateToken(userId: string): Promise<boolean>;
    generateNewToken(userId: string): Promise<string>;
    manageToken(userId: string): Promise<{
        token: string;
        message: string;
    }>;
    checkBotPremiumStatus(userId: string): Promise<boolean>;
    addBotPremium(userId: string, duration: string): Promise<string>;
    getPremiumDetails(userId: string): Promise<string>;
    addLinkToFirstSort(newLink: {
        shareId: number;
        aioShortUrl: string;
    }): Promise<boolean>;
    getFirstSortItem(): Promise<SortDocument | null>;
    setActiveShareId(newActiveShareId: string): Promise<boolean>;
    updateFirstSortAndActivePath(newLink: {
        shareId: number;
        aioShortUrl: string;
    }, newActiveShareId: string): Promise<boolean>;
}
export interface RequestDBClient {
    initialize(): Promise<void>;
    hasReachedRequestLimit(userId: string): any;
    addUserRequest(userId: string): any;
    saveRequestData(userId: string): any;
}
