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

    await ctx.reply(msg, {
      reply_to_message_id: replyMessage.message_id,
    });
  } catch (err) {
    console.error("Error handling reply command:", err);
    ctx.reply("An error occurred while processing the reply.");
  }
}
