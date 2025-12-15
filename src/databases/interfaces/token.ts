import { Document } from "mongoose";

interface ITokenDocument extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
  bot_premium?: {
    is_bot_premium: boolean;
    subscriptionType?: "Gold" | "Silver" | "Platinum" | "Other";
    duration?: number;
    expires_at?: Date;
    activated_at: Date;
    details?: string;
  };
}

export { ITokenDocument };
