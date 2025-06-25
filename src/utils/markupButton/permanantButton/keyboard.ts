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
        { text: '𝗉𝗋𝖾𝗏', callback_data: prev },
        { text: '𝗇𝖾𝗑𝗍', callback_data: next },
      ],
      [{ text: '𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗', url: link }],
      [{ text: '𝗝𝗼𝗶𝗻 𝗕𝗮𝗰𝗸-𝗨𝗣', url: `${env.backup}` }],
      [
        {
          text: '𝗛𝗼𝘄 𝘁𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱',
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
      { text: '𝗉𝗋𝖾𝗏', callback_data: prev },
      { text: '𝗇𝖾𝗑𝗍', callback_data: next },
    ]);
  }

  inlineKeyboard.push(
    [{ text: `𝗧𝗼𝘁𝗮𝗹 𝗶𝗻𝘃𝗶𝘁𝗲𝘀: ${totalInvites}`, callback_data: totalInvites }],
    [{ text: '𝗜𝗻𝗰𝗿𝗲𝗮𝘀𝗲 𝗗𝗮𝗶𝗹𝘆 𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝘀', url: link }]
  );

  return {
    inline_keyboard: inlineKeyboard,
  };
};

export const makeCollectionButton = (link: string) => {
  return {
    inline_keyboard: [
      [{ text: '𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱', url: link }],
      [{ text: '𝗝𝗼𝗶𝗻 𝗕𝗮𝗰𝗸-𝗨𝗽', url: env.backup }],
      [
        {
          text: '𝗛𝗼𝘄 𝘁𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱',
          url: `${env.howToDownload ? env.howToDownload : "https://t.me/Infinite_tips/17"}`,
        },
      ],
    ],
  };
};
export const makeBackupButton = () => {
  return {
    inline_keyboard: [[{ text: '𝗝𝗼𝗶𝗻 𝗕𝗮𝗰𝗸-𝗨𝗽', url: env.backup }]],
  };
};

export const makeAdminButtons = (link: string, next: string, prev: string) => {
  return {
    inline_keyboard: [
      [
        { text: '𝗉𝗋𝖾𝗏', callback_data: prev },
        { text: '𝗚𝗲𝘁 𝗧𝗵𝗶𝘀', url: link },
        { text: '𝗇𝖾𝗑𝗍', callback_data: next },
      ],
      [
        { text: '𝗗𝗲𝗹𝗲𝘁𝗲 𝗧𝗵𝗶𝘀', callback_data: 'delete' },
        { text: '𝗘𝗱𝗶𝘁 𝗧𝗵𝗶𝘀', callback_data: 'edit' },
      ],
    ],
  };
};
export const editAnimeButtons = () => {
  return {
    inline_keyboard: [
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗡𝗮𝗺𝗲', callback_data: 'name' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗚𝗲𝗻𝗿𝗲𝘀', callback_data: 'genres' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗦𝗲𝗮𝘀𝗼𝗻', callback_data: 'season' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗾𝘂𝗮𝗹𝗶𝘁𝘆', callback_data: 'quality' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗧𝗼𝘁𝗮𝗹 𝗘𝗽𝘀', callback_data: 'totaleps' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗹𝗮𝗻𝗴𝘂𝗮𝗴𝗲', callback_data: 'language' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗦𝘂𝗯𝘁𝗶𝘁𝗹𝗲', callback_data: 'subtitle' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗣𝗼𝘀𝘁𝗲𝗿', callback_data: 'poster' },
      ],
      [{ text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗚𝗲𝗻𝗿𝗲𝘀', callback_data: 'genres' }],
      [{ text: '𝗔𝗱𝗱 𝗡𝗲𝘅𝘁 𝗘𝗽𝗶𝘀𝗼𝗱𝗲𝘀 𝗢𝗳 𝘁𝗵𝗶𝘀 𝗮𝗻𝗶𝗺𝗲', callback_data: 'add' }],
    ],
  };
};
export const editMovieButton = () => {
  return {
    inline_keyboard: [
      [
        { text: '𝗘𝗱𝗶𝘁 𝗠𝗼𝘃𝗶𝗲 𝗡𝗮𝗺𝗲', callback_data: 'name' },
        { text: '𝗘𝗱𝗶𝘁 𝗠𝗼𝘃𝗶𝗲 𝗬𝗲𝗮𝗿', callback_data: 'year' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗾𝘂𝗮𝗹𝗶𝘁𝘆', callback_data: 'quality' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗹𝗮𝗻𝗴𝘂𝗮𝗴𝗲', callback_data: 'language' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗦𝘂𝗯𝘁𝗶𝘁𝗹𝗲', callback_data: 'subtitle' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗥𝗮𝘁𝗶𝗻𝗴', callback_data: 'rating' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗣𝗼𝘀𝘁𝗲𝗿', callback_data: 'poster' },
        { text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗦𝘆𝗻𝗼𝗽𝘀𝗶𝘀', callback_data: 'synopsis' },
      ],
      [{ text: '𝗘𝗱𝗶𝘁 𝗮𝗻𝗶𝗺𝗲 𝗚𝗲𝗻𝗿𝗲𝘀', callback_data: 'genres' }],
      [{ text: '𝗔𝗱𝗱 𝗡𝗲𝘅𝘁 𝗘𝗽𝗶𝘀𝗼𝗱𝗲𝘀 𝗢𝗳 𝘁𝗵𝗶𝘀 𝗮𝗻𝗶𝗺𝗲', callback_data: 'add' }],
    ],
  };
};
export const editAIOButtons = () => {
  return {
    inline_keyboard: [
      [{ text: '𝗘𝗱𝗶𝘁 𝗧𝗵𝗲 𝗖𝗮𝗽𝘁𝗶𝗼𝗻', callback_data: 'caption' }],
      [{ text: '𝗘𝗱𝗶𝘁 𝗧𝗵𝗲 𝗣𝗼𝘀𝘁𝗲𝗿', callback_data: 'poster' }],
      [{ text: '𝗔𝗱𝗱 𝗡𝗲𝘅𝘁 𝗘𝗽𝗶𝘀𝗼𝗱𝗲𝘀 𝗢𝗳 𝘁𝗵𝗶𝘀 𝗗𝗿𝗮𝗺𝗮', callback_data: 'add' }],
    ],
  };
};
export const editDramaButtons = () => {
  return {
    inline_keyboard: [
      [
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗡𝗮𝗺𝗲', callback_data: 'name' },
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗬𝗲𝗮𝗿', callback_data: 'year' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗦𝗲𝗮𝘀𝗼𝗻', callback_data: 'season' },
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗾𝘂𝗮𝗹𝗶𝘁𝘆', callback_data: 'quality' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗧𝗼𝘁𝗮𝗹 𝗘𝗽𝘀', callback_data: 'totaleps' },
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗹𝗮𝗻𝗴𝘂𝗮𝗴𝗲', callback_data: 'language' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗦𝘂𝗯𝘁𝗶𝘁𝗹𝗲', callback_data: 'subtitle' },
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗥𝗮𝘁𝗶𝗻𝗴', callback_data: 'rating' },
      ],
      [
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗣𝗼𝘀𝘁𝗲𝗿', callback_data: 'poster' },
        { text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗦𝘆𝗻𝗼𝗽𝘀𝗶𝘀', callback_data: 'synopsis' },
      ],
      [{ text: '𝗘𝗱𝗶𝘁 𝗗𝗿𝗮𝗺𝗮 𝗚𝗲𝗻𝗿𝗲𝘀', callback_data: 'genres' }],
      [{ text: '𝗔𝗱𝗱 𝗡𝗲𝘅𝘁 𝗘𝗽𝗶𝘀𝗼𝗱𝗲𝘀 𝗢𝗳 𝘁𝗵𝗶𝘀 𝗗𝗿𝗮𝗺𝗮', callback_data: 'add' }],
    ],
  };
};

export function customButtonsKeyboard(): any {
  return Markup.keyboard([
    [' ', '𝗣𝗼𝗽𝘂𝗹𝗮𝗿'],
    ['𝗦𝗲𝘁𝘁𝗶𝗻𝗴', '𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸'],
    ['𝗔𝗱𝘀', '𝗥𝗮𝘁𝗲 𝘂𝘀', '𝗦𝗵𝗮𝗿𝗲'],
  ])
    .oneTime()
    .resize();
}

export function specialButtonsKeyboard(): any {
  return Markup.keyboard([
    Markup.button.contactRequest('𝗦𝗲𝗻𝗱 𝗰𝗼𝗻𝘁𝗮𝗰𝘁'),
    Markup.button.locationRequest('𝗦𝗲𝗻𝗱 𝗹𝗼𝗰𝗮𝘁𝗶𝗼𝗻'),
  ]).resize();
}

export function pyramidKeyboard(): any {
  return Markup.keyboard(['𝗼𝗻𝗲', '𝘁𝘄𝗼', '𝘁𝗵𝗿𝗲𝗲', '𝗳𝗼𝘂𝗿', '𝗳𝗶𝘃𝗲', '𝘀𝗶𝘅'], {
    wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
  });
}

export function simpleHTMLKeyboard(): any {
  return Markup.keyboard(['𝗖𝗼𝗸𝗲', '𝗣𝗲𝗽𝘀𝗶']);
}

export function inlineHTMLKeyboard(): any {
  return Markup.inlineKeyboard([
    Markup.button.callback('𝗖𝗼𝗸𝗲', 'Coke'),
    Markup.button.callback('𝗣𝗲𝗽𝘀𝗶', 'Pepsi'),
  ]);
}

export function randomInlineKeyboard(): any {
  return Markup.inlineKeyboard([
    Markup.button.callback('𝗖𝗼𝗸𝗲', 'Coke'),
    Markup.button.callback('𝗗𝗿 𝗣𝗲𝗽𝗽𝗲𝗿', 'Dr Pepper', Math.random() > 0.5),
    Markup.button.callback('𝗣𝗲𝗽𝘀𝗶', 'Pepsi'),
  ]);
}

export function captionInlineKeyboard(): any {
  return Markup.inlineKeyboard([
    Markup.button.callback('𝗣𝗹𝗮𝗶𝗻', 'plain'),
    Markup.button.callback('𝗜𝘁𝗮𝗹𝗶𝗰', 'italic'),
  ]);
}

export function wrapKeyboard(columns: number): any {
  return Markup.keyboard(['𝗼𝗻𝗲', '𝘁𝘄𝗼', '𝘁𝗵𝗿𝗲𝗲', '𝗳𝗼𝘂𝗿', '𝗳𝗶𝘃𝗲', '𝘀𝗶𝘅'], {
    columns: columns,
  });
}
