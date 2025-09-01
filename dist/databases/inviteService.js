import InviteModel from "./models/inviteModel.js";
import logger from "../utils/logger.js";
export class InviteService {
    async addInvite(userId, invitedUsername, invitedUserId) {
        let user = await InviteModel.findOne({ userId });
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
    async getInviteUser(userId) {
        return InviteModel.findOne({ userId }).exec();
    }
    async canRequest(userId) {
        const today = new Date().setHours(0, 0, 0, 0);
        let user = await InviteModel.findOne({ userId });
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
    async useRequest(userId) {
        const user = await InviteModel.findOne({ userId });
        if (!user || user.dailyRequests <= 0) {
            throw new Error("No more requests allowed today.");
        }
        user.dailyRequests -= 1;
        await user.save();
    }
    async getTopInviters() {
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
        }
        catch (error) {
            logger.error("Error fetching top inviters:", error);
            throw new Error("Failed to fetch top inviters.");
        }
    }
    async resetUserInvites(userId) {
        try {
            const result = await InviteModel.updateOne({ userId }, { $set: { invites: [] } });
            if (result.matchedCount === 0) {
                logger.info(`No user found with userId: ${userId}`);
            }
            else if (result.modifiedCount === 0) {
                logger.info(`No changes made. Invites were already empty for userId: ${userId}`);
            }
            else {
                logger.info(`Successfully reset invites for userId: ${userId}`);
            }
        }
        catch (error) {
            logger.error("Error resetting invites for user:", error);
            throw new Error("Failed to reset invites for the user.");
        }
    }
    async updateInviteUsed(userId, newUsedInvites) {
        try {
            const user = await InviteModel.findOne({ userId });
            if (!user) {
                logger.info(`No user found with userId: ${userId}`);
                return false;
            }
            const oldUsedInvites = user.inviteUsed || 0;
            const updatedUsedInvites = oldUsedInvites + newUsedInvites;
            const result = await InviteModel.updateOne({ userId }, { $set: { inviteUsed: updatedUsedInvites } });
            if (result.modifiedCount > 0) {
                return true;
            }
            else {
                logger.info(`No changes made. InviteUsed for userId: ${userId} remains the same.`);
                return false;
            }
        }
        catch (error) {
            logger.error("Error updating inviteUsed:", error);
            return false;
        }
    }
    async getInviteStatus(userId) {
        try {
            const user = await InviteModel.findOne({ userId });
            if (!user) {
                logger.info(`No user found with userId: ${userId}`);
                return null;
            }
            const totalInvites = user.invites.length;
            const usedInvites = user.inviteUsed || 0;
            const remainingInvites = Math.max(0, totalInvites - usedInvites);
            return { totalInvites, usedInvites, remainingInvites };
        }
        catch (error) {
            logger.error("Error fetching invite status:", error);
            throw new Error("Failed to fetch invite status.");
        }
    }
}
