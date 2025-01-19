import UserModel, { IUserDocument } from "./models/inviteModel.js";

export class InviteService {
  async addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void> {
    let user: IUserDocument | null = await UserModel.findOne({ userId });

    if (!user) {
      user = new UserModel({
        userId,
        invites: [],
        lastRequestDate: new Date(0),
        dailyRequests: 5,
      });
    }

    if (user.invites.some((invite) => invite.username === invitedUsername)) {
      throw new Error("User already invited.");
    }

    user.invites.push({ username: invitedUsername, userId: invitedUserId });
    user.dailyRequests += 1;
    await user.save();
  }

  async getInviteUser(userId: string): Promise<IUserDocument | null> {
    return UserModel.findOne({ userId }).exec();
  }

  async canRequest(userId: string): Promise<boolean> {
    const today = new Date().setHours(0, 0, 0, 0);

    let user: IUserDocument | null = await UserModel.findOne({ userId });

    if (!user) {
      user = new UserModel({
        userId,
        lastRequestDate: new Date(0),
        invites: [],
        dailyRequests: 5,
      });
      await user.save();
    }

    if (user.lastRequestDate.setHours(0, 0, 0, 0) !== today) {
      user.dailyRequests = 5 + user.invites.length;
      user.lastRequestDate = new Date();
      await user.save();
    }

    return user.dailyRequests > 0;
  }

  async useRequest(userId: string): Promise<void> {
    const user: IUserDocument | null = await UserModel.findOne({ userId });

    if (!user || user.dailyRequests <= 0) {
      throw new Error("No more requests allowed today.");
    }

    user.dailyRequests -= 1;
    await user.save();
  }

  async getTopInviters(): Promise<{ userId: string; username: string; inviteCount: number }[]> {
    try {
      // Aggregate pipeline to calculate and fetch top inviters
      const topInviters = await UserModel.aggregate([
        {
          $project: {
            userId: 1,
            username: { $ifNull: [{ $arrayElemAt: ["$invites.username", 0] }, "Unknown User"] },
            inviteCount: { $size: "$invites" }, // Calculate the number of invites
          },
        },
        { $sort: { inviteCount: -1 } }, // Sort by inviteCount in descending order
        { $limit: 10 },
      ]);

      return topInviters;
    } catch (error) {
      console.error("Error fetching top inviters:", error);
      throw new Error("Failed to fetch top inviters.");
    }
  }
}
