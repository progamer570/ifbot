import env from "../../services/env.js";
import { editAIOTitle } from "./editCaption.js";
export function makeDramaCaption(data) {
    return "\nTitle: ".concat(data.dramaName, "\nGenres: [").concat(data.genre.map(function (genre) { return "".concat(genre, ","); }).join(""), "]\nReleasing Year: ").concat(data.year, "\nSeason: ").concat(data.season, "\nLanguage: [").concat(data.language, "]\nSubtitle: ").concat(data.subtitle, "\nRating: ").concat(data.rating, "\nQuality: ").concat(data.quality, "\nTotal Episodes: ").concat(data.totalEpisodes, "\n ");
}
export function makeAIOCaption(data) {
    return "".concat(editAIOTitle(data.aIOTitle, env.join));
}
export function makeAnimeCaption(data) {
    return "\nTitle: ".concat(data.animeName, "\nSeason: ").concat(data.season, "\nLanguage: [").concat(data.language, "]\nSubtitle: ").concat(data.subtitle, "\nQuality: ").concat(data.quality, "\nTotal Episodes: ").concat(data.totalEpisodes, "\n ");
}
// Description: ${data.synopsis}
// Backup Channel: ${data.channel}
export function makeMovieCaption(data) {
    return "\nTitle: ".concat(data.movieName, "\nGenres: [").concat(data.genres.map(function (genre) { return "".concat(genre, ","); }).join(""), "]\nReleasing Year: ").concat(data.year, "\nLanguage: [").concat(data.language, "]\nSubtitle: ").concat(data.subtitle, "\nRating: ").concat(data.rating, "\nQuality: ").concat(data.quality, "\n  ");
}
