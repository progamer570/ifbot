import express from "express";
import env from "./services/env.js";
import telegram from "./services/telegram.js";
import commands from "./handlers/commands/index.js";
import stage from "./scenes/index.js";
import { session } from "telegraf";
import database from "./services/database.js";
import filters from "./middleware/filters.js";
import { useNewReplies } from "telegraf/future";
import logger from "./utils/logger.js";

const app = telegram.app;

app.use(session());

app.use(stage.middleware());
app.use(filters.private);
app.use(commands.reqAioHandler);
app.use(useNewReplies());

app.command("start", commands.startHandler);
app.command("addtopremium", commands.addToPremiumHandler);
app.command("premium", commands.premiumHandler);
app.command("autoreact", commands.autoReplyHandler);
app.command("reply", commands.replyHandler);
app.command("myinvites", commands.invitesHandler);
app.command("totalusers", commands.totalUsersHandler);
app.command("broadcast", commands.myBroadcastHandler);
app.command("add", commands.addAIOHandler);
app.command("createong", commands.createOngoingHandler);
app.command("addh", commands.addAIOHandler);
app.command("addong", commands.addOngoingHandler);
app.command("edit", commands.editAIOHandler);
app.command("topinviters", commands.topInvitesHandler);
app.command("myinvitestatus", commands.inviteStatusHandler);

app.catch(async (err, ctx) => {
  logger.error(`Error in ${ctx.updateType}`, err);
});
const interval = 10 * 60 * 1000;

async function main() {
  await database.initialize();
  await telegram.initialize();

  setInterval(async () => {
    try {
      const response = await fetch(env.webhookDomain + "/check");

      logger.info(`Service is alive: Status ${response.status}`);
    } catch (error) {
      logger.error(`service check failed`, error);
    }
  }, interval);

  if (env.development) {
    app.launch({ dropPendingUpdates: true });
  } else {
    const domain = env.webhookDomain;
    if (!domain) {
      throw Error("Please provide WEBHOOK_DOMAIN");
    }
    const server = express();
    server.get("/check", (req, res) => {
      res.sendStatus(200);
    });
    const port = env.port;

    server.use(await app.createWebhook({ domain, path: "/zhao010203" }));
    server.listen(port, () => logger.info(`Server listening on ${port}`));
  }
}
main().catch((err) => logger.error("Main function error:", err));

process.once("SIGINT", () => app.stop("SIGINT"));
process.once("SIGTERM", () => app.stop("SIGTERM"));
