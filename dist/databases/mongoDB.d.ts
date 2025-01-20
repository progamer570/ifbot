import mongoose, { Model } from "mongoose";
import { MessageDocument } from "./models/messageModel.js";
import { UserDocument } from "./models/userModel.js";
import { SortDocument } from "./interfaces/sort.js";
import { AIODocument } from "./interfaces/aIO.js";
import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
import { InviteService } from "./inviteService.js";
import { InviteUser } from "./interfaces/inviteUser.js";
import { OngoingDocument } from "./interfaces/ongoingDocument.js";
import { ITokenDocument } from "./interfaces/token.js";
declare class MongoDB {
    db: typeof mongoose;
    MessageModel: Model<MessageDocument>;
    UserModel: Model<UserDocument>;
    SortModel: Model<SortDocument>;
    AIOModel: Model<AIODocument>;
    OngoingModel: Model<OngoingDocument>;
    HindiDramaModel: Model<AIODocument>;
    TokenModel: Model<ITokenDocument>;
    inviteService: InviteService;
    databaseUrl: string;
    constructor();
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    saveUser(user: UserDocument): Promise<UserDocument>;
    getAllUserIds(): Promise<number[]>;
    isUserExist(userId: string): Promise<boolean>;
    countUsers(): Promise<string>;
    saveSort(sort: SortDocument): Promise<SortDocument>;
    getFirstItem(): Promise<SortDocument | null>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<number[] | undefined>;
    getOngoingMessages(shareId: number): Promise<number[] | undefined>;
    saveAIO(aio: AIODocument): Promise<AIODocument>;
    saveOngoing(ong: OngoingDocument): Promise<OngoingDocument>;
    getHindiMessages(shareId: number): Promise<number[] | undefined>;
    saveHindiDrama(aio: AIODocument): Promise<AIODocument>;
    searchAIO(criteria: AIOSearchCriteria, messageIdLink?: string | null): Promise<AIODocument[] | undefined>;
    searchHindiDrama(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    addAIO(shareId: number, messageIds: number[]): Promise<boolean>;
    deleteAIO(shareId: number): Promise<boolean>;
    updateAIOAttribute(shareId: number, updateQuery: any): Promise<boolean>;
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
    manageToken(userId: string, token?: string): Promise<{
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
declare const mongoDB: MongoDB;
export default mongoDB;
