import mongoose, { Model } from "mongoose";
import env from "../services/env.js";
import MessageModel, { MessageDocument } from "./models/messageModel.js";
import UserModel, { UserDocument } from "./models/userModel.js";
import { SortDocument } from "./interfaces/sort.js";
import SortModel from "./models/sortModel.js";

import AIOModel from "./models/aIOModel.js";
import OngoingModel from "./models/ongoingModel.js";
import { HindiDramaModel } from "./models/aIOModel.js";

import { AIODocument } from "./interfaces/aIO.js";

import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
import { InviteService } from "./inviteService.js";
import { InviteUser } from "./interfaces/inviteUser.js";
import { OngoingDocument } from "./interfaces/ongoingDocument.js";
class MongoDB {
  db: typeof mongoose;
  MessageModel: Model<MessageDocument>;
  UserModel: Model<UserDocument>;
  SortModel: Model<SortDocument>;
  AIOModel: Model<AIODocument>;
  OngoingModel: Model<OngoingDocument>;
  HindiDramaModel: Model<AIODocument>;
  inviteService: InviteService;
  databaseUrl: string;

  constructor() {
    this.db = mongoose;
    this.MessageModel = MessageModel;
    this.UserModel = UserModel;
    this.SortModel = SortModel;
    this.AIOModel = AIOModel;
    this.OngoingModel = OngoingModel;
    this.HindiDramaModel = HindiDramaModel;
    this.databaseUrl = env.databaseUrl || "";
    this.inviteService = new InviteService();
  }

  async initialize() {
    await this.db.connect(this.databaseUrl);
  }

  async saveMessages(shareId: number, messageIds: number[]) {
    await new this.MessageModel({
      shareId,
      messageIds,
    }).save();

    return shareId;
  }
  async saveUser(user: UserDocument) {
    try {
      const existingUser = await this.UserModel.findOne({ id: Number(user.id) });
      if (!existingUser) {
        await new this.UserModel(user).save();
      }
      return user;
    } catch (error) {
      console.error("Error saving user:", error);
    }
    return user;
  }
  async getAllUserIds(): Promise<number[]> {
    try {
      const users = await UserModel.find().select("id");
      const userIds = users.map((user) => user.id);
      return userIds;
    } catch (error) {
      console.error("Error fetching user IDs:", error);
      return [];
    }
  }
  async isUserExist(userId: string): Promise<boolean> {
    try {
      const userExists = await this.UserModel.findOne({ id: Number(userId) });
      console.log(userExists);
      return userExists?.id ? true : false;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  }
  async countUsers(): Promise<string> {
    try {
      const itemCount = await this.UserModel.countDocuments();
      return `: ${itemCount}`;
    } catch (error) {
      return "Error counting users";
    }
  }

  async saveSort(sort: SortDocument) {
    await new this.SortModel(sort).save();
    return sort;
  }
  async removeFirstItem() {
    try {
      const document = await SortModel.findOne({}, { sort: { $slice: 1 } });
      if (!document || document.sort.length === 0) {
        console.log("No document found or the sort array is empty.");
        return null;
      }
      const removedItem = document.sort[0];
      await SortModel.findOneAndUpdate(
        { _id: document._id },
        { $pop: { sort: -1 } },
        { new: true }
      );
      return removedItem;
    } catch (err) {
      return null;
    }
  }

  async getMessages(shareId: number) {
    return (await this.MessageModel.findOne({ shareId }))?.messageIds;
  }

  async getAIOMessages(shareId: number) {
    return (await this.AIOModel.findOne({ shareId }))?.messageIds;
  }
  async getOngoingMessages(shareId: number) {
    return (await this.OngoingModel.findOne({ shareId }))?.messageIds;
  }

  async saveAIO(aio: AIODocument) {
    await new this.AIOModel(aio).save();
    return aio;
  }
  async saveOngoing(ong: OngoingDocument) {
    await new this.OngoingModel(ong).save();
    return ong;
  }
  async getHindiMessages(shareId: number) {
    return (await this.HindiDramaModel.findOne({ shareId }))?.messageIds;
  }

  async saveHindiDrama(aio: AIODocument) {
    await new this.HindiDramaModel(aio).save();
    return aio;
  }

  async searchAIO(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined> {
    if (!criteria.aIOTitle || criteria.aIOTitle.length < 2) {
      console.log("Please provide a valid search criteria.");
      return undefined;
    }
    const normalizedTitle = criteria.aIOTitle;
    const first20Chars = normalizedTitle.slice(0, 20);

    const query = {
      aIOTitle: { $regex: new RegExp(first20Chars, "i") },
    };

    let specialQuery = {};
    if (first20Chars.length > 4) {
      const keywords = first20Chars
        .replace(/\s+/g, " ")
        .split(" ")
        .map((keyword) => `(?=.*${keyword})`)
        .join("");
      const regexPattern = new RegExp(`^${keywords}`, "i");

      specialQuery = {
        aIOTitle: { $regex: regexPattern },
      };
    }

    try {
      let results = await this.AIOModel.find(query);

      if (results.length === 0 && Object.keys(specialQuery).length > 0) {
        results = await this.AIOModel.find(specialQuery);
      }

      return results;
    } catch (err) {
      console.error("Error executing the query:", err);
      return undefined;
    }
  }
  async searchHindiDrama(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined> {
    if (!criteria.aIOTitle || criteria.aIOTitle.length < 2) {
      console.log("Please provide a valid search criteria.");
      return undefined;
    }
    const normalizedTitle = criteria.aIOTitle;
    const first20Chars = normalizedTitle.slice(0, 20);

    const query = {
      aIOTitle: { $regex: new RegExp(first20Chars, "i") },
    };

    let specialQuery = {};
    if (first20Chars.length > 4) {
      const keywords = first20Chars
        .replace(/\s+/g, " ")
        .split(" ")
        .map((keyword) => `(?=.*${keyword})`)
        .join("");
      const regexPattern = new RegExp(`^${keywords}`, "i");

      specialQuery = {
        aIOTitle: { $regex: regexPattern },
      };
    }

    try {
      let results = await this.HindiDramaModel.find(query);

      if (results.length === 0 && Object.keys(specialQuery).length > 0) {
        results = await this.HindiDramaModel.find(specialQuery);
      }

      return results;
    } catch (err) {
      console.error("Error executing the query:", err);
      return undefined;
    }
  }

  async addAIO(shareId: number, messageIds: number[]) {
    const aioDocument = await this.AIOModel.findOne({ shareId });
    if (aioDocument) {
      await this.AIOModel.findByIdAndUpdate(
        aioDocument.id,
        { $push: { messageIds: { $each: messageIds } } },
        { new: true }
      );
      return true;
    } else {
      return false;
    }
  }

  async deleteAIO(shareId: number) {
    const animeDocument = await this.AIOModel.findOne({ shareId });
    if (animeDocument) {
      await this.AIOModel.findByIdAndDelete(animeDocument.id);
      return true;
    } else {
      return false;
    }
  }

  async updateAIOAttribute(shareId: number, updateQuery: any) {
    try {
      await AIOModel.updateOne({ shareId: shareId }, { $set: updateQuery });
      return true;
    } catch (error) {
      console.error("Error updating drama attribute:", error);
      return false;
    }
  }

  //invite
  async addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void> {
    await this.inviteService.addInvite(userId, invitedUsername, invitedUserId);
  }

  async getInviteUser(userId: string): Promise<InviteUser | null> {
    return this.inviteService.getInviteUser(userId);
  }

  async canRequest(userId: string): Promise<boolean> {
    return this.inviteService.canRequest(userId);
  }

  async useRequest(userId: string): Promise<void> {
    await this.inviteService.useRequest(userId);
  }
}

const mongoDB = new MongoDB();

export default mongoDB;
