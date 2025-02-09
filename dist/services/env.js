var _a, _b, _c, _d, _e;
import "dotenv/config";
var env = process.env;
var token = env.TELEGRAM_BOT_TOKEN;
var dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
var logGroupId = Number(env.LOG_GROUP_ID);
var dbOngoingChannelId = Number(env.DB_ONGOING_CHANNEL_ID);
var dbPosterLink = env.DB_POSTER;
var dbPosterID = Number(env.DB_POSTER_ID);
var channelSource = Number(env.CHANNEL_SOURCE_ID);
var channelSourceLink = env.CHANNEL_SOURCE_LINK;
var development = env.DEVELOPMENT;
var webhookDomain = env.WEBHOOK_DOMAIN;
var otherDomain = env.OTHER_DOMIAN || "";
var baseUrl = env.BASE_URL || "";
var sortApiKey = env.SHORT_API_KEY || "";
var howToDownload = env.HOW_TO_DOWNLOAD_MSG_LINK || "";
var botUserName = env.BOT_USERNAME;
var port = env.PORT || 8080;
var forceChannelIds = ((_a = env.FORCE_CHANNEL_IDS) === null || _a === void 0 ? void 0 : _a.split(" ").map(Number)) || [];
var forceGroupIds = ((_b = env.FORCE_GROUP_IDS) === null || _b === void 0 ? void 0 : _b.split(" ").map(Number)) || [];
var allowGroups = ((_c = env.ALLOW_GROUPS) === null || _c === void 0 ? void 0 : _c.split(" ").map(Number)) || [];
var withoutCmd = ((_d = env.ALLOW_GROUPS_WITHOUT_COMMAND) === null || _d === void 0 ? void 0 : _d.split(" ").map(Number)) || [];
var adminIds = (_e = env.ADMIN_IDS) === null || _e === void 0 ? void 0 : _e.split(" ").map(Number);
var ownerId = Number(env.OWNER_ID) || 0;
var databaseUrl = env.DATABASE_URL;
var join = env.JOIN || "";
var backup = env.BACKUP || "";
var request = env.REQUEST || "";
var joinAnime = env.JOIN_ANIME || "";
var collectionAIO = Number(env.COLLECTION_AIO) || "";
var collectionHindi = Number(env.COLLECTION_HINDI) || "";
var collectionOngoing = Number(env.ONGOING_COLLECTION) || "";
var collectionAIOBackup = Number(env.COLLECTION_AIO_BACKUP) || "";
var jwtSecret = env.JWT_SECRET || "randomSecretString";
var howToGenerateToken = env.HOW_TO_GENERATE_TOKEN;
var apiBaseUrl = env.API_BASE_URL || "";
var apiFetchToken = env.API_FETCH_TOKEN || "";
if (!token) {
    throw Error("Provide TELEGRAM_BOT_TOKEN");
}
if (!adminIds) {
    throw Error("Provide ADMIN_IDS");
}
export default {
    baseUrl: baseUrl,
    apiBaseUrl: apiBaseUrl,
    apiFetchToken: apiFetchToken,
    ownerId: ownerId,
    collectionAIOBackup: collectionAIOBackup,
    logGroupId: logGroupId,
    sortApiKey: sortApiKey,
    token: token,
    botUserName: botUserName,
    dbPosterLink: dbPosterLink,
    dbPosterID: dbPosterID,
    jwtSecret: jwtSecret,
    development: development,
    webhookDomain: webhookDomain,
    port: port,
    channelSourceLink: channelSourceLink,
    join: join,
    howToGenerateToken: howToGenerateToken,
    backup: backup,
    howToDownload: howToDownload,
    dbAIOChannelId: dbAIOChannelId,
    dbOngoingChannelId: dbOngoingChannelId,
    joinAnime: joinAnime,
    collectionHindi: collectionHindi,
    collectionAIO: collectionAIO,
    collectionOngoing: collectionOngoing,
    channelSource: channelSource,
    request: request,
    forceChannelIds: forceChannelIds,
    allowGroups: allowGroups,
    withoutCmd: withoutCmd,
    forceGroupIds: forceGroupIds,
    adminIds: adminIds,
    databaseUrl: databaseUrl,
    otherDomain: otherDomain,
};
