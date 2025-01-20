import InviteModel, { IUserDocument } from "./models/inviteModel.js";

export class InviteService {
  async addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void> {
    let user: IUserDocument | null = await InviteModel.findOne({ userId });

    if (!user) {
      user = new InviteModel({
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
    return InviteModel.findOne({ userId }).exec();
  }

  async canRequest(userId: string): Promise<boolean> {
    const today = new Date().setHours(0, 0, 0, 0);

    let user: IUserDocument | null = await InviteModel.findOne({ userId });

    if (!user) {
      user = new InviteModel({
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
    const user: IUserDocument | null = await InviteModel.findOne({ userId });

    if (!user || user.dailyRequests <= 0) {
      throw new Error("No more requests allowed today.");
    }

    user.dailyRequests -= 1;
    await user.save();
  }

  async getTopInviters(): Promise<{ userId: string; inviteCount: number }[]> {
    try {
      // Aggregate pipeline to fetch top inviters based on the invite count
      const topInviters = await InviteModel.aggregate([
        {
          $project: {
            userId: 1, // Include userId
            inviteCount: { $size: "$invites" }, // Calculate the number of invites
          },
        },
        { $sort: { inviteCount: -1 } }, // Sort by inviteCount in descending order
        { $limit: 15 },
      ]);

      return topInviters;
    } catch (error) {
      console.error("Error fetching top inviters:", error);
      throw new Error("Failed to fetch top inviters.");
    }
  }
  async resetUserInvites(userId: string): Promise<void> {
    try {
      const result = await InviteModel.updateOne({ userId }, { $set: { invites: [] } });

      if (result.matchedCount === 0) {
        console.log(`❌ No user found with userId: ${userId}`);
      } else if (result.modifiedCount === 0) {
        console.log(`⚠️ No changes made. Invites were already empty for userId: ${userId}`);
      } else {
        console.log(`✅ Successfully reset invites for userId: ${userId}`);
      }
    } catch (error) {
      console.error("❌ Error resetting invites for user:", error);
      throw new Error("Failed to reset invites for the user.");
    }
  }
  async updateInviteUsed(userId: string, newUsedInvites: number): Promise<boolean> {
    try {
      const user = await InviteModel.findOne({ userId });

      if (!user) {
        console.log(`❌ No user found with userId: ${userId}`);
        return false;
      }

      const oldUsedInvites = user.inviteUsed || 0;

      const updatedUsedInvites = oldUsedInvites + newUsedInvites;

      const result = await InviteModel.updateOne(
        { userId },
        { $set: { inviteUsed: updatedUsedInvites } }
      );

      if (result.modifiedCount > 0) {
        return true;
      } else {
        console.log(`⚠️ No changes made. InviteUsed for userId: ${userId} remains the same.`);
        return false;
      }
    } catch (error) {
      console.error("❌ Error updating inviteUsed:", error);

      return false;
    }
  }
  async getInviteStatus(userId: string): Promise<{
    totalInvites: number;
    usedInvites: number;
    remainingInvites: number;
  } | null> {
    try {
      const user = await InviteModel.findOne({ userId });

      if (!user) {
        console.log(`❌ No user found with userId: ${userId}`);
        return null;
      }

      const totalInvites = user.invites.length;
      const usedInvites = user.inviteUsed || 0;

      const remainingInvites = Math.max(0, totalInvites - usedInvites);

      return { totalInvites, usedInvites, remainingInvites };
    } catch (error) {
      console.error("❌ Error fetching invite status:", error);
      throw new Error("Failed to fetch invite status.");
    }
  }
}
