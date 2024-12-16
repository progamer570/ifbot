import { CommandContext } from "../../interfaces.js";

export default async function replyHandler(ctx: CommandContext) {
  try {
    const replyMessage = ctx.message.reply_to_message;
    if (!replyMessage) {
      return ctx.reply("Please reply to a message to use this command.");
    }

    const msg = ctx.message.text.replace("/reply", "").trim();
    // if (!args) {
    //   return ctx.reply("Usage: /reply <message>");
    // }
    await ctx.deleteMessage();

    await ctx.reply(msg);
  } catch (err) {
    console.error("Error handling reply command:", err);
  }
}
