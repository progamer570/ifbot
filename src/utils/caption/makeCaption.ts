import env from "../../services/env.js";
import { editAIOTitle } from "./editCaption.js";

export function makeDramaCaption(data: any): string {
  return `
Title: ${data.dramaName}
Genres: [${data.genre.map((genre: string) => `${genre},`).join("")}]
Releasing Year: ${data.year}
Season: ${data.season}
Language: [${data.language}]
Subtitle: ${data.subtitle}
Rating: ${data.rating}
Quality: ${data.quality}
Total Episodes: ${data.totalEpisodes}
 `;
}
export function makeAIOCaption(data: any): string {
  return `${editAIOTitle(data.aIOTitle, env.join)}`;
}
export function makeAnimeCaption(data: any): string {
  return `
Title: ${data.animeName}
Season: ${data.season}
Language: [${data.language}]
Subtitle: ${data.subtitle}
Quality: ${data.quality}
Total Episodes: ${data.totalEpisodes}
 `;
}
// Description: ${data.synopsis}
// Backup Channel: ${data.channel}

export function makeMovieCaption(data: any): string {
  return `
Title: ${data.movieName}
Genres: [${data.genres.map((genre: string) => `${genre},`).join("")}]
Releasing Year: ${data.year}
Language: [${data.language}]
Subtitle: ${data.subtitle}
Rating: ${data.rating}
Quality: ${data.quality}
  `;
}
