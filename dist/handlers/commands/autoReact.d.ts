import { WizardContext } from "telegraf/typings/scenes";
interface AutoReplyEntry {
    userName: string;
    expiry: number;
}
export declare const autoReplyMemory: Record<number, AutoReplyEntry>;
export default function autoReactHandler(ctx: WizardContext): Promise<void>;
export {};
