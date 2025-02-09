import { ReactionType, TelegramEmoji, User } from "telegraf/typings/core/types/typegram.js";
import { CommandContext } from "../interfaces.js";
export declare function sendTokenExpiredMessage(ctx: CommandContext, user: User, shortUrl: string, payload: string): Promise<void>;
export declare function sendInviteMessage(ctx: CommandContext, user: User, userId: string): Promise<void>;
export declare function sendDailyLimitMessage(ctx: CommandContext, user: User, userId: string): Promise<void>;
export declare function sendInviterWelcomeMessage(ctx: CommandContext, inviterId: string): Promise<void>;
export declare function sendTokenGeneratedMessage(ctx: CommandContext, token: string): Promise<void>;
export declare const generateInviteLink: (userId: string, sharLink: boolean) => string;
export declare function getRandomReactionEmoji(): TelegramEmoji | ReactionType;
export declare function hasReplyToMessage(message: any): message is {
    reply_to_message: any;
};
export declare function isTextMessage(message: any): message is {
    text: string;
};
export declare const getUrlFromFileId: (fromFileId: string) => Promise<string>;
