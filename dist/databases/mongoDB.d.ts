/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import mongoose, { Model } from "mongoose";
import { MessageDocument } from "./models/messageModel.js";
import { UserDocument } from "./models/userModel.js";
import { SortDocument } from "./interfaces/sort.js";
import { AIODocument } from "./interfaces/aIO.js";
import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
import { InviteService } from "./inviteService.js";
import { InviteUser } from "./interfaces/inviteUser.js";
import { OngoingDocument } from "./interfaces/ongoingDocument.js";
declare class MongoDB {
    db: typeof mongoose;
    MessageModel: Model<MessageDocument>;
    UserModel: Model<UserDocument>;
    SortModel: Model<SortDocument>;
    AIOModel: Model<AIODocument>;
    OngoingModel: Model<OngoingDocument>;
    HindiDramaModel: Model<AIODocument>;
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
    removeFirstItem(): Promise<import("./interfaces/sort.js").Sort | null>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<number[] | undefined>;
    getOngoingMessages(shareId: number): Promise<number[] | undefined>;
    saveAIO(aio: AIODocument): Promise<AIODocument>;
    saveOngoing(ong: OngoingDocument): Promise<OngoingDocument>;
    getHindiMessages(shareId: number): Promise<number[] | undefined>;
    saveHindiDrama(aio: AIODocument): Promise<AIODocument>;
    searchAIO(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    searchHindiDrama(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    addAIO(shareId: number, messageIds: number[]): Promise<boolean>;
    deleteAIO(shareId: number): Promise<boolean>;
    updateAIOAttribute(shareId: number, updateQuery: any): Promise<boolean>;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
}
declare const mongoDB: MongoDB;
export default mongoDB;
