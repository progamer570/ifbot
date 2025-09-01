async function sendCallbackQueryResponse(ctx, message) {
    await ctx.answerCbQuery(message + "wait before next and prev", {
        show_alert: true,
        cache_time: 5,
    });
}
export { sendCallbackQueryResponse };
