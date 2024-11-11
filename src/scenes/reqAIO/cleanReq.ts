const unwantedKeywords = [
  " sub",
  " subtitle",
  " subtitles",
  "sub ",
  "Subtitle ",
  "Subtitles ",
  " eng",
  "eng ",
  "drama ",
  "movie ",
  " drama",
  " movie",
  " mkv",
  "mkv ",
];

export function cleanString(inputString: string): string {
  let cleanedString = inputString
    .replace(".", "")
    .replace(/[^A-Za-z0-9\s]/g, " ")
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .replace(/[()';:]/g, " ")
    .trim();

  for (const keyword of unwantedKeywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    cleanedString = cleanedString.replace(regex, " ");
  }
  cleanedString = cleanedString.replace(/\s+/g, " ").trim();
  return cleanedString;
}
