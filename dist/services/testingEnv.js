var _a, _b, _c;
import "dotenv/config";
var env = process.env;
var token = env.TELEGRAM_BOT_TOKEN;
var dbDramaChannelId = Number(env.DB_CHANNEL_ID);
var dbMovieChannelId = Number(env.DB_MOVIE_CHANNEL_ID);
var dbAnimeChannelId = Number(env.DB_ANIME_CHANNEL_ID);
var dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
var development = env.DEVELOPMENT;
var webhookDomain = env.WEBHOOK_DOMAIN;
var botUserName = env.BOT_USERNAME;
var port = env.PORT || 8080;
// const forceChannelIds = env.FORCE_CHANNEL_IDS?.split(" ").map(Number) || [];
var forceGroupIds = ((_a = env.FORCE_GROUP_IDS) === null || _a === void 0 ? void 0 : _a.split(" ").map(Number)) || [];
var allowGroups = ((_b = env.ALLOW_GROUPS) === null || _b === void 0 ? void 0 : _b.split(" ").map(Number)) || [];
var adminIds = (_c = env.ADMIN_IDS) === null || _c === void 0 ? void 0 : _c.split(" ").map(Number);
var databaseUrl = env.DATABASE_URL;
var join = env.JOIN || "";
var joinAnime = env.JOIN_ANIME || "";
var collectionDrama = env.COLLECTION_DRAMA || "";
var collectionAnime = env.COLLECTION_ANIME || "";
var collectionMovie = env.COLLECTION_MOVIE || "";
var collectionAIO = env.COLLECTION_AIO || "";
if (!token) {
    throw Error("Provide TELEGRAM_BOT_TOKEN");
}
if (!dbDramaChannelId) {
    throw Error("Provide DB_CHANNEL_ID");
}
if (!dbMovieChannelId) {
    throw Error("Provide DB_MOVIE_CHANNEL_ID");
}
if (!adminIds) {
    throw Error("Provide ADMIN_IDS");
}
export default {
    token: token,
    botUserName: botUserName,
    dbDramaChannelId: dbDramaChannelId,
    dbMovieChannelId: dbMovieChannelId,
    development: development,
    webhookDomain: webhookDomain,
    port: port,
    join: join,
    collectionDrama: collectionDrama,
    collectionAnime: collectionAnime,
    collectionMovie: collectionMovie,
    dbAnimeChannelId: dbAnimeChannelId,
    dbAIOChannelId: dbAIOChannelId,
    joinAnime: joinAnime,
    collectionAIO: collectionAIO,
    // forceChannelIds,
    allowGroups: allowGroups,
    forceGroupIds: forceGroupIds,
    adminIds: adminIds,
    databaseUrl: databaseUrl,
};
