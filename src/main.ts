import express from "express";
import env from "./services/env.js";
import telegram from "./services/telegram.js";
import commands from "./handlers/commands/index.js";
import stage from "./scenes/index.js";
import { session } from "telegraf";
import database from "./services/database.js";
import filters from "./middleware/filters.js";

const app = telegram.app;

app.use(session());

app.use(stage.middleware());
app.use(filters.private);
app.use(commands.reqAIOHandler);

app.command("start", commands.startHandler);
app.command("reply", commands.replyHandler);
app.command("myinvites", commands.invitesHandler);
app.command("totalusers", commands.totalUsersHandler);
app.command("broadcast", commands.myBroadcastHandler);
app.command("add", commands.addAIOHandler);
app.command("addh", commands.addAIOHandler);
app.command("addong", commands.addOngoingHandler);
app.command("edit", commands.editAIOHandler);

app.catch(async (err, ctx) => {
  console.error(`Error in ${ctx.updateType}`, err);
});

async function main() {
  await database.initialize();
  await telegram.initialize();

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
    server.listen(port, () => console.log(`Server listening on ${port}`));
  }
}
main();

process.once("SIGINT", () => app.stop("SIGINT"));
process.once("SIGTERM", () => app.stop("SIGTERM"));
