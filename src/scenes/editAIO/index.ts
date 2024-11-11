import { Scenes, Markup, Composer } from "telegraf";
import PageSessionData from "./pageSessionData.js";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSearchCriteria } from "../../databases/interfaces/searchCriteria.js";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import * as list from "../../utils/markupButton/permanantButton/lists.js";
import { sendToLogGroup } from "../../utils/sendToCollection.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { processCaptionForStore } from "../../utils/caption/editCaption.js";

// Create a Wizard Scene
const editDeleteWizard = new Scenes.WizardScene<WizardContext<PageSessionData>>(
  "editAIO",
  Composer.on("message", async (ctx) => {
    if ("text" in ctx.message) {
      (ctx.session as PageSessionData).done = false;
      (ctx.session as PageSessionData).messageIds = [];

      (ctx.session as PageSessionData).page = 0;
      const request = ctx.message.text.replace("/edit", "").trim();
      const searchCriteria: AIOSearchCriteria = {
        aIOTitle: request,
      };
      const finalResult = await database.searchAIO(searchCriteria);
      const random = getRandomId();
      (ctx.session as PageSessionData).prev = `prev${random}`;
      (ctx.session as PageSessionData).next = `next${random}`;
      console.log((ctx.session as PageSessionData).prev);

      (ctx.session as PageSessionData).aIOData = finalResult;
      if (finalResult && finalResult.length > 0) {
        const photo = finalResult[0].aIOPosterID;
        await ctx.replyWithPhoto(photo, {
          caption: `\`\`\`Json\n{${makeAIOCaption(finalResult[0])}}\n\`\`\``,
          reply_markup: keyboard.makeAdminButtons(
            `https://t.me/${env.botUserName}?start=${finalResult[0].shareId}-a`,
            (ctx.session as PageSessionData).next || "",
            (ctx.session as PageSessionData).prev || ""
          ),
          parse_mode: "MarkdownV2",
          reply_to_message_id: ctx.message.message_id,
        });
        (ctx.session as PageSessionData).selectedShareId = finalResult[0].shareId;

        if (finalResult.length > 1) {
          return ctx.wizard.next();
        }
      } else {
        await ctx.reply(`${ctx.from.first_name} your ${request} not found `);
        ctx.scene.leave;
      }

      return ctx.wizard.next();
    }
  }),

  Composer.on("callback_query", async (ctx) => {
    if (
      "data" in ctx.callbackQuery &&
      ((ctx.session as PageSessionData).next === ctx.callbackQuery.data ||
        (ctx.session as PageSessionData).prev === ctx.callbackQuery.data ||
        ctx.callbackQuery.data === "edit" ||
        ctx.callbackQuery.data === "delete")
    ) {
      const page = (ctx.session as PageSessionData).page || 0;
      const AIOData = (ctx.session as PageSessionData).aIOData;
      console.log([
        (ctx.session as PageSessionData).page || 0,
        (ctx.session as PageSessionData).aIOData?.length,
      ]);

      if (AIOData) {
        if (ctx.callbackQuery.data.startsWith("next")) {
          if (page + 1 < AIOData.length) {
            (ctx.session as PageSessionData).page =
              ((ctx.session as PageSessionData).page ?? 0) + 1;
            console.log(page, AIOData.length);

            const photo = AIOData[(ctx.session as PageSessionData).page || 0].aIOPosterID;
            //edit
            await ctx.editMessageMedia({
              type: "photo",
              media: photo,
            });
            await ctx.editMessageCaption(
              `\`\`\`Json\n{${makeAIOCaption(AIOData[page + 1])}}\n\`\`\``,
              {
                reply_markup: keyboard.makeAdminButtons(
                  `https://t.me/${env.botUserName}?start=${AIOData[page + 1].shareId}-a`,
                  (ctx.session as PageSessionData).next || "",
                  (ctx.session as PageSessionData).prev || ""
                ),
                parse_mode: "MarkdownV2",
              }
            );
            (ctx.session as PageSessionData).selectedShareId = AIOData[page + 1].shareId;
          } else {
            await sendCallbackQueryResponse(ctx, `This is the last no more there !! `);
          }
        } else if (ctx.callbackQuery.data.startsWith("prev")) {
          if (AIOData && page != 0) {
            //ignore this page != 0
            (ctx.session as PageSessionData).page = Math.max(
              ((ctx.session as PageSessionData).page ?? 0) - 1,
              0
            );
            const photo = AIOData[page - 1].aIOPosterID;
            await ctx.editMessageMedia({
              type: "photo",
              media: photo,
            });
            await ctx.editMessageCaption(
              `\`\`\`Json\n {${makeAIOCaption(AIOData[page - 1])}}\n\`\`\``,
              {
                reply_markup: keyboard.makeAdminButtons(
                  `https://t.me/${env.botUserName}?start=${AIOData[page - 1].shareId}-a`,
                  (ctx.session as PageSessionData).next || "",
                  (ctx.session as PageSessionData).prev || ""
                ),
                parse_mode: "MarkdownV2",
              }
            );
            (ctx.session as PageSessionData).selectedShareId = AIOData[page - 1].shareId;
          } else {
            await sendCallbackQueryResponse(ctx, `Nothing in Prev !! `);
          }
        } else if (ctx.callbackQuery.data.startsWith("delete")) {
          (ctx.session as PageSessionData).editDelete = "delete";
          await ctx.reply("are you sure you want to delete this", {
            reply_markup: {
              inline_keyboard: [[{ text: "yes delete", callback_data: "delete" }]],
            },
          });
          return ctx.wizard.next();
        } else if (ctx.callbackQuery.data.startsWith("edit")) {
          (ctx.session as PageSessionData).editDelete = "edit";
          await ctx.reply("What you want to edit in this AIO", {
            reply_markup: keyboard.editAIOButtons(),
          });
          return ctx.wizard.next();
        }
      } else {
        await sendCallbackQueryResponse(ctx, `No more data there !!!`);
      }
    } else {
      await sendCallbackQueryResponse(ctx, `you need to search again this AIO !!!`);
    }
  }),
  Composer.on("callback_query", async (ctx) => {
    const selectedShareId = (ctx.session as PageSessionData).selectedShareId || 0;

    if ("data" in ctx.callbackQuery) {
      if (ctx.callbackQuery.data.startsWith("caption")) {
        (ctx.session as PageSessionData).tracker = "caption";
        await ctx.reply("enter the name AIO ");
        return ctx.wizard.next();
      } else if (ctx.callbackQuery.data.startsWith("poster")) {
        (ctx.session as PageSessionData).tracker = "poster";
        await ctx.reply("Send a poster of this AIO");
        return ctx.wizard.next();
      } else if (ctx.callbackQuery.data.startsWith("add")) {
        (ctx.session as PageSessionData).tracker = "add";
        await ctx.reply("send me file that you want to add");
        return ctx.wizard.next();
      } else if (ctx.callbackQuery.data.startsWith("delete")) {
        await ctx.editMessageText("deleting ...");
        await database.deleteAIO(selectedShareId);
        await ctx.editMessageText("deleted successfully");
        await ctx.editMessageReplyMarkup({
          inline_keyboard: [[{ text: "deleted", callback_data: "delete" }]],
        });
        try {
          let message;
          const username = ctx.from?.username;
          const firstName = ctx.from?.first_name || "USER";
          const userId = ctx.from?.id;

          if (username) {
            message = `Deleted AIO ${selectedShareId} by [${firstName}: ${userId}](https://t.me/${username})`;
          } else {
            message = `Deleted AIO ${selectedShareId} by [${firstName}: ${userId}](tg://user?id=${userId})`;
          }
          await sendToLogGroup(env.logGroupId, message);
        } catch {}
        return await ctx.scene.leave();
      }
    }
  }),
  Composer.on("message", async (ctx) => {
    const selectedShareId = (ctx.session as PageSessionData).selectedShareId || 0;
    const tracker = (ctx.session as PageSessionData).tracker || "";
    if (tracker.startsWith("caption") && ctx.message && "text" in ctx.message) {
      await database.updateAIOAttribute(selectedShareId, {
        aIOTitle: ctx.message.text,
      });
      await ctx.reply("edited");

      try {
        const user = {
          id: ctx.from.id,
          firstname: ctx.from.first_name,
          username: ctx.from.username,
        };
        await sendToLogGroup(
          env.logGroupId,
          getUserLinkMessage(`Edited AIO Caption ${selectedShareId} by  `, user)
        );
      } catch {}
      return await ctx.scene.leave();
    } else if (tracker.startsWith("poster") && ctx.message && "photo" in ctx.message) {
      if (ctx.message && "photo" in ctx.message) {
        const photoFileId: string = ctx.message.photo[0].file_id;
        await database.updateAIOAttribute(selectedShareId, {
          AIOPosterID: photoFileId,
        });

        try {
          const user = {
            id: ctx.from.id,
            firstname: ctx.from.first_name,
            username: ctx.from.username,
          };
          await sendToLogGroup(
            env.logGroupId,
            getUserLinkMessage(
              `Edited AIO Poster ${selectedShareId} by  ${selectedShareId} by `,
              user
            )
          );
        } catch {}
        await ctx.reply("edited");
      }
      return await ctx.scene.leave();
    } else if (tracker.startsWith("add")) {
      if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Share AIO Canceled start again /editD");
        return await ctx.scene.leave();
      }
      if (ctx.message) {
        const text: string = "text" in ctx.message ? ctx.message.text : "";

        if (text.toLowerCase() === "done" && !(ctx.session as PageSessionData).done) {
          const { messageIds, captions } = ctx.session as PageSessionData;
          await ctx.reply(`\`\`\`AIO details and file received.\n 🎉\`\`\``, {
            parse_mode: "MarkdownV2",
          });
          (ctx.session as PageSessionData).done = true;
          const forwardedMessageIds = await telegram.forwardMessages(
            env.dbAIOChannelId,
            ctx.chat?.id,
            messageIds ? messageIds : [],
            false,
            captions
          );
          await database.addAIO(selectedShareId, forwardedMessageIds);
          // await editCaption(env.dbAIOChannelId, forwardedMessageIds, env.join);
          try {
            const user = {
              id: ctx.from.id,
              firstname: ctx.from.first_name,
              username: ctx.from.username,
            };
            await sendToLogGroup(
              env.logGroupId,
              getUserLinkMessage(`Added eps To AIO ${selectedShareId} by `, user)
            );
          } catch {}
          return await ctx.scene.leave();
        } else {
          await ctx.reply(
            `Send next file if Done Click Done ${
              (ctx.session as PageSessionData).messageIds?.length
            }`,
            keyboard.oneTimeDoneKeyboard()
          );
          (ctx.session as PageSessionData).messageIds?.push(ctx.message.message_id);
          let caption: string = getRandomId().toString();
          if ("caption" in ctx.message) {
            caption = ctx.message.caption || "I_F";
            (ctx.session as PageSessionData).captions =
              (ctx.session as PageSessionData).captions || [];
            (ctx.session as PageSessionData).captions?.push(caption);
          } else {
            caption = "I_F";
            (ctx.session as PageSessionData).captions =
              (ctx.session as PageSessionData).captions || [];
            (ctx.session as PageSessionData).captions?.push(caption);
          }
        }
      }
    } else {
      ctx.reply("somthing went wrong try again");
      return await ctx.scene.leave();
    }
  })
);

export default editDeleteWizard;
