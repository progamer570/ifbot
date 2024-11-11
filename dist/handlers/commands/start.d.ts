import { CommandContext } from "../../interfaces.js";
export default function startHandler(ctx: CommandContext): Promise<void | import("@telegraf/types").Message.TextMessage>;
export declare const generateInviteLink: (userId: string, sharLink: boolean) => string;
