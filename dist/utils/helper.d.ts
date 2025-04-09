import { ReactionType, TelegramEmoji, User } from "telegraf/typings/core/types/typegram.js";
import { CommandContext } from "../interfaces.js";
export declare function sendTokenExpiredMessage(ctx: CommandContext, user: User, shortUrl: string, payload: string): Promise<void>;
export declare function sendWelcomeMessage(ctx: CommandContext, user: {
    first_name?: string;
}, userId: string): Promise<void>;
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
export declare function convertToTinySubscript(inputText: string): string;
export declare function escapeMarkdownV2(text: string): string;
export declare const premiumPlan: import("telegraf/format").FmtString<"fmt">;
export declare const developerInfo = "  \n\u2023 \u1D05\u1D07\u1D20\u1D07\u029F\u1D0F\u1D18\u1D07\u0280 : \u1D00\u0274\u1D0D\u1D0F\u029F  \n\u2023 \u026A\u1D05 : [\u1D00\u0274\u1D0D\u1D0F\u029F](t.me/eywwi)  \n\u2023 \u029F\u026A\u0299\u0280\u1D00\u0280\u028F : \u1D1B\u1D07\u029F\u1D07\u0262\u0280\u1D00\uA730  \n\u2023 \u029F\u1D00\u0274\u0262\u1D1C\u1D00\u0262\u1D07 : \u1D1Bs  \n\u2023 \u1D05\u1D00\u1D1B\u1D00\u0299\u1D00s\u1D07 : \u1D0D\u1D0F\u0274\u0262\u1D0F\u1D05\u0299  \n\u2023 \u029C\u1D0Fs\u1D1B\u1D07\u1D05 \u1D0F\u0274 : \u1D00\u029F\u029F \u1D21\u1D07\u0299  \n";
export declare const helpMessage = "  \n\u2728 \u029C\u1D0F\u1D21 \u1D1B\u1D0F \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B \u1D05\u0280\u1D00\u1D0D\u1D00\uA731 & \u1D0D\u1D0F\u1D20\u026A\u1D07\uA731 \u2728  \n\n1\uFE0F\u20E3 \uA731\u1D07\u1D00\u0280\u1D04\u029C \u1D1B\u029C\u1D07 \u1D04\u1D0F\u0280\u0280\u1D07\u1D04\u1D1B \u0274\u1D00\u1D0D\u1D07 \u1D0F\u0274 \u0262\u1D0F\u1D0F\u0262\u029F\u1D07.  \n2\uFE0F\u20E3 \uA731\u1D07\u0274\u1D05 \u1D1B\u029C\u1D07 \u0274\u1D00\u1D0D\u1D07 \u026A\u0274 \u1D1B\u029C\u1D07 \u0262\u0280\u1D0F\u1D1C\u1D18.  \n3\uFE0F\u20E3 \u1D1C\uA731\u1D07 \u1D1B\u029C\u026A\uA731 \uA730\u1D0F\u0280\u1D0D\u1D00\u1D1B:  \n\n\uD83D\uDE80 \uA730\u1D0F\u029F\u029F\u1D0F\u1D21 \u1D1B\u029C\u1D07\uA731\u1D07 \uA731\u1D1B\u1D07\u1D18\uA731!  \n";
export declare function getInviteMessage(username: string, userId: string): string;
