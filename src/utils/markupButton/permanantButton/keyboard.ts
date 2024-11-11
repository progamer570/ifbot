// keyboardExamples.ts
import { Markup } from "telegraf";
import * as list from "./lists.js";
import env from "../../../services/env.js";

export function oneTimeGenreKeyboard(): any {
  return Markup.keyboard(list.genresList).oneTime().resize();
}
export function oneTimeSeasonKeyboard(): any {
  return Markup.keyboard(list.seasonList).oneTime().resize();
}
export function oneTimeLangKeyboard(): any {
  return Markup.keyboard(list.langList).oneTime().resize();
}
export function oneTimeSubKeyboard(): any {
  return Markup.keyboard(list.subList).oneTime().resize();
}
export function oneTimeRatingKeyboard(): any {
  return Markup.keyboard(list.imdbRatingList).oneTime().resize();
}
export function oneTimeQualityKeyboard(): any {
  return Markup.keyboard(list.qualityList).oneTime().resize();
}
export function oneTimeDoneKeyboard(): any {
  return Markup.keyboard([["Done"]])
    .oneTime()
    .resize();
}
export const makeButtons = (link: string, next: string, prev: string) => {
  return {
    inline_keyboard: [
      [
        { text: "⬅️ Prev", callback_data: prev },
        { text: "Next ➡️", callback_data: next },
      ],
      [{ text: "DOWNLOAD", url: link }],
      [{ text: "❣️❣️ Join Back-UP ❣️❣️", url: `${env.backup}` }],
      [
        {
          text: "❣️❣️ How to Download ❣️❣️",
          url: `${env.howToDownload ? env.howToDownload : "https://t.me/Infinite_tips/17"}`,
        },
      ],
    ],
  };
};
export const makeInviteButtons = (
  link: string,
  totalInvites: string,
  next: string,
  prev: string
) => {
  const totalInvitesNumber = parseInt(totalInvites, 10); // Convert to number for comparison

  const inlineKeyboard: any[] = [];

  if (totalInvitesNumber > 40) {
    inlineKeyboard.push([
      { text: "⬅️ Prev", callback_data: prev },
      { text: "Next ➡️", callback_data: next },
    ]);
  }

  inlineKeyboard.push(
    [{ text: `Total invites: ${totalInvites}`, callback_data: totalInvites }],
    [{ text: "Increase Daily Requests", url: link }]
  );

  return {
    inline_keyboard: inlineKeyboard,
  };
};

export const makeCollectionButton = (link: string) => {
  return {
    inline_keyboard: [
      [{ text: "Download", url: link }],
      [{ text: "Join Back-Up", url: env.backup }],
      [
        {
          text: "❣️❣️ How to Download ❣️❣️",
          url: `${env.howToDownload ? env.howToDownload : "https://t.me/Infinite_tips/17"}`,
        },
      ],
    ],
  };
};

export const makeAdminButtons = (link: string, next: string, prev: string) => {
  return {
    inline_keyboard: [
      [
        { text: "⬅️ Prev", callback_data: prev },
        { text: "Get This", url: link },
        { text: "Next ➡️", callback_data: next },
      ],
      [
        { text: "Delete This", callback_data: "delete" },
        { text: "Edit This", callback_data: "edit" },
      ],
    ],
  };
};
export const editAnimeButtons = () => {
  return {
    inline_keyboard: [
      [
        { text: "Edit anime Name", callback_data: "name" },
        { text: "Edit anime Name", callback_data: "genres" },
      ],
      [
        { text: "Edit anime Season", callback_data: "season" },
        { text: "Edit anime quality", callback_data: "quality" },
      ],
      [
        { text: "Edit anime Total Eps", callback_data: "totaleps" },
        { text: "Edit anime language", callback_data: "language" },
      ],
      [
        { text: "Edit anime Subtitle", callback_data: "subtitle" },
        { text: "Edit anime Poster", callback_data: "poster" },
      ],
      [{ text: "Edit anime Genres", callback_data: "genres" }],

      [{ text: "Add Next Episodes Of this anime", callback_data: "add" }],
    ],
  };
};
export const editMovieButton = () => {
  return {
    inline_keyboard: [
      [
        { text: "Edit Movie Name", callback_data: "name" },
        { text: "Edit Movie Year", callback_data: "year" },
      ],
      [
        { text: "Edit anime quality", callback_data: "quality" },
        { text: "Edit anime language", callback_data: "language" },
      ],
      [
        { text: "Edit anime Subtitle", callback_data: "subtitle" },
        { text: "Edit anime Rating", callback_data: "rating" },
      ],
      [
        { text: "Edit anime Poster", callback_data: "poster" },
        { text: "Edit anime Synopsis", callback_data: "synopsis" },
      ],
      [{ text: "Edit anime Genres", callback_data: "genres" }],
      [{ text: "Add Next Episodes Of this anime", callback_data: "add" }],
    ],
  };
};
export const editAIOButtons = () => {
  return {
    inline_keyboard: [
      [{ text: "Edit The Caption", callback_data: "caption" }],
      [{ text: "Edit The Poster", callback_data: "poster" }],
      [{ text: "Add Next Episodes Of this Drama", callback_data: "add" }],
    ],
  };
};
export const editDramaButtons = () => {
  return {
    inline_keyboard: [
      [
        { text: "Edit Drama Name", callback_data: "name" },
        { text: "Edit Drama Year", callback_data: "year" },
      ],
      [
        { text: "Edit Drama Season", callback_data: "season" },
        { text: "Edit Drama quality", callback_data: "quality" },
      ],
      [
        { text: "Edit Drama Total Eps", callback_data: "totaleps" },
        { text: "Edit Drama language", callback_data: "language" },
      ],
      [
        { text: "Edit Drama Subtitle", callback_data: "subtitle" },
        { text: "Edit Drama Rating", callback_data: "rating" },
      ],
      [
        { text: "Edit Drama Poster", callback_data: "poster" },
        { text: "Edit Drama Synopsis", callback_data: "synopsis" },
      ],
      [{ text: "Edit Drama Genres", callback_data: "genres" }],
      [{ text: "Add Next Episodes Of this Drama", callback_data: "add" }],
    ],
  };
};

export function customButtonsKeyboard(): any {
  return Markup.keyboard([
    [" ", "😎 Popular"],
    ["☸ Setting", "📞 Feedback"],
    ["📢 Ads", "⭐️ Rate us", "👥 Share"],
  ])
    .oneTime()
    .resize();
}

export function specialButtonsKeyboard(): any {
  return Markup.keyboard([
    Markup.button.contactRequest("Send contact"),
    Markup.button.locationRequest("Send location"),
  ]).resize();
}

export function pyramidKeyboard(): any {
  return Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
    wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
  });
}

export function simpleHTMLKeyboard(): any {
  return Markup.keyboard(["Coke", "Pepsi"]);
}

export function inlineHTMLKeyboard(): any {
  return Markup.inlineKeyboard([
    Markup.button.callback("Coke", "Coke"),
    Markup.button.callback("Pepsi", "Pepsi"),
  ]);
}

export function randomInlineKeyboard(): any {
  return Markup.inlineKeyboard([
    Markup.button.callback("Coke", "Coke"),
    Markup.button.callback("Dr Pepper", "Dr Pepper", Math.random() > 0.5),
    Markup.button.callback("Pepsi", "Pepsi"),
  ]);
}

export function captionInlineKeyboard(): any {
  return Markup.inlineKeyboard([
    Markup.button.callback("Plain", "plain"),
    Markup.button.callback("Italic", "italic"),
  ]);
}

export function wrapKeyboard(columns: number): any {
  return Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
    columns: columns,
  });
}
