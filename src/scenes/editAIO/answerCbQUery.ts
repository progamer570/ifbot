import { Context } from "telegraf";

async function sendCallbackQueryResponse(ctx: Context, message: string): Promise<void> {
  await ctx.answerCbQuery(message + "wait before next and prev", {
    show_alert: true,
    cache_time: 5,
  });
}
export { sendCallbackQueryResponse };
