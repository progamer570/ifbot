import { User } from "telegraf/typings/core/types/typegram.js";
import { DatabaseClient, RequestDBClient } from "../interfaces.js";
import { AIOSearchCriteria } from "../databases/interfaces/searchCriteria.js";
import { AIODocument } from "../databases/interfaces/aIO.js";
import { SortDocument } from "../databases/interfaces/sort.js";
import { InviteUser } from "../databases/interfaces/inviteUser.js";
import { OngoingDocument } from "../databases/interfaces/ongoingDocument.js";
declare class Database {
    client: DatabaseClient;
    constructor();
    initialize(): Promise<void>;
    saveMessages(messageIds: number[]): Promise<number>;
    saveAIO(aIODocument: AIODocument): Promise<number>;
    saveOngoing(ongoingDocument: OngoingDocument): Promise<number>;
    saveHindiDrama(aIODocument: AIODocument): Promise<number>;
    searchAIO(searchCriteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    searchHindiDrama(searchCriteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    getAIOMessages(shareId: number): Promise<number[] | undefined>;
    getOngoingMessages(shareId: number): Promise<number[] | undefined>;
    getHindiMessages(shareId: number): Promise<number[] | undefined>;
    saveSort(sortDocument: SortDocument): Promise<SortDocument>;
    removeFirstItem(): Promise<any>;
    saveUser(user: User): Promise<User>;
    getAllUserIds(): Promise<number[] | undefined>;
    isUserExist(user: string): Promise<boolean>;
    countUsers(): Promise<string>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    addAIO(shareId: number, eps: number[]): Promise<any>;
    deleteAIO(shareId: number): Promise<any>;
    updateAIOAttribute(shareId: number, attribute: any): Promise<any>;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
}
declare class ReqDB {
    reqClient: RequestDBClient;
    constructor();
    initialize(): Promise<void>;
    addUserRequest(userId: string): Promise<any>;
    hasReachedRequestLimit(userId: string): Promise<any>;
    saveRequestData(userId: string): Promise<any>;
}
declare const database: Database;
declare const reqDB: ReqDB;
export { reqDB };
export default database;
