import { Scenes, Composer } from "telegraf";
import PageSessionData from "./pageSessionData";
import { WizardContext } from "telegraf/typings/scenes";
import database from "../../services/database.js";
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { makeInviteButtons } from "../../utils/markupButton/permanantButton/keyboard.js";
import { generateInviteLink } from "../../handlers/commands/start.js";

// Create a Wizard Scene
const myInvitePagination = new Scenes.WizardScene<WizardContext<PageSessionData>>(
  "myInvites",
  Composer.on("message", async (ctx) => {
    if ("text" in ctx.message) {
      (ctx.session as PageSessionData).page = 0;
      const myInviteUser = await database.getInviteUser(ctx.from.id.toString());
      if (!myInviteUser) {
        ctx.reply(
          `Invite atleast 1 users to see your invited user list \nyour invite link is: ${generateInviteLink(
            ctx.from.id.toString(),
            false
          )}`,
          {
            reply_to_message_id: ctx.message.message_id,
          }
        );
      }
      if (myInviteUser) {
        (ctx.session as PageSessionData).id = ctx.from.id.toString();
        (ctx.session as PageSessionData).totalInvites = myInviteUser.invites.length.toString();
        const random = getRandomId();
        const invites = myInviteUser.invites;
        const batchSize = 40;
        const numberOfBatches = Math.ceil(invites.length / batchSize);

        const batches = [];

        for (let i = 0; i < numberOfBatches; i++) {
          const batchStartIndex = i * batchSize;
          const batch = invites.slice(batchStartIndex, batchStartIndex + batchSize);
          const batchText = batch
            .map((invite, index) => {
              return `${batchStartIndex + index + 1}. Username : ${invite.userId}  
___________________________________`;
            })
            .join("\n");
          batches.push(`you invited : \n${batchText}`);
        }

        (ctx.session as PageSessionData).inviteData = batches;
        (ctx.session as PageSessionData).prev = `prev${random}`;
        (ctx.session as PageSessionData).next = `next${random}`;
        console.log((ctx.session as PageSessionData).prev);
        try {
          await ctx
            .reply(`\`\`\`\n${batches[0] || "You have not invited anyone yet."}\n\`\`\``, {
              reply_markup: makeInviteButtons(
                generateInviteLink(ctx.from.id.toString(), true),
                myInviteUser.invites.length.toString(),
                (ctx.session as PageSessionData).next || "",
                (ctx.session as PageSessionData).prev || ""
              ),
              parse_mode: "MarkdownV2",
              reply_to_message_id: ctx.message.message_id,
            })
            .then((sentMessage) => {
              try {
                const messageIdToDelete = sentMessage.message_id;
                setTimeout(() => {
                  ctx.deleteMessage(messageIdToDelete);
                }, 5 * 60 * 60 * 1000);
              } catch {}
            });
        } catch (error) {}
      }
      return ctx.wizard.next();
    }
  }),
  Composer.on("callback_query", async (ctx) => {
    if (
      "data" in ctx.callbackQuery &&
      ((ctx.session as PageSessionData).next === ctx.callbackQuery.data ||
        (ctx.session as PageSessionData).prev === ctx.callbackQuery.data)
    ) {
      const page = (ctx.session as PageSessionData).page || 0;
      const link = generateInviteLink((ctx.session as PageSessionData).id!, true);
      const totalInvites = (ctx.session as PageSessionData).totalInvites!;

      const inviteData = (ctx.session as PageSessionData).inviteData;
      console.log([
        (ctx.session as PageSessionData).page || 0,
        (ctx.session as PageSessionData).inviteData?.length,
      ]);

      if (inviteData) {
        try {
          if (ctx.callbackQuery.data.startsWith("next")) {
            if (page + 1 < inviteData.length) {
              (ctx.session as PageSessionData).page =
                ((ctx.session as PageSessionData).page ?? 0) + 1;
              console.log(page, inviteData.length);
              await ctx.editMessageText(`\`\`\`\n${inviteData[page + 1]}\n\`\`\``, {
                reply_markup: makeInviteButtons(
                  link,
                  totalInvites,
                  (ctx.session as PageSessionData).next || "",
                  (ctx.session as PageSessionData).prev || ""
                ),
                parse_mode: "MarkdownV2",
              });
            } else {
              await sendCallbackQueryResponse(ctx, `This is the last no more there !! `);
            }
          } else if (ctx.callbackQuery.data.startsWith("prev")) {
            if (inviteData && page != 0) {
              //ignore this page != 0
              (ctx.session as PageSessionData).page = Math.max(
                ((ctx.session as PageSessionData).page ?? 0) - 1,
                0
              );

              await ctx.editMessageText(
                `\`\`\`\n ${makeAIOCaption(inviteData[page - 1])}\n\`\`\``,
                {
                  reply_markup: makeInviteButtons(
                    link,
                    totalInvites,
                    (ctx.session as PageSessionData).next || "",
                    (ctx.session as PageSessionData).prev || ""
                  ),
                  parse_mode: "MarkdownV2",
                }
              );
            } else {
              await sendCallbackQueryResponse(ctx, `Nothing in Prev !! `);
            }
          }
        } catch (error) {}
      } else {
        await sendCallbackQueryResponse(ctx, `No more data there !!!`);
      }
    } else {
      await sendCallbackQueryResponse(ctx, `you need to search again this  !!!`);
    }
  })
);

export default myInvitePagination;
