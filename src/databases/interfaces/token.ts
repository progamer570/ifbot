import { Document } from "mongoose";

interface ITokenDocument extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
}
export { ITokenDocument };
