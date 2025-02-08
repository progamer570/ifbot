import "dotenv/config";

const env = process.env;
const token = env.TELEGRAM_BOT_TOKEN;

const dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
const logGroupId = Number(env.LOG_GROUP_ID);
const dbOngoingChannelId = Number(env.DB_ONGOING_CHANNEL_ID);
const dbPosterLink = env.DB_POSTER;
const dbPosterID = Number(env.DB_POSTER_ID);
const channelSource = Number(env.CHANNEL_SOURCE_ID);
const channelSourceLink = env.CHANNEL_SOURCE_LINK;
const development = env.DEVELOPMENT;
const webhookDomain = env.WEBHOOK_DOMAIN;
const otherDomain = env.OTHER_DOMIAN || "";
const baseUrl = env.BASE_URL || "";
const sortApiKey = env.SHORT_API_KEY || "";
const howToDownload = env.HOW_TO_DOWNLOAD_MSG_LINK || "";
const botUserName = env.BOT_USERNAME;
const port = env.PORT || 8080;
const forceChannelIds = env.FORCE_CHANNEL_IDS?.split(" ").map(Number) || [];
const forceGroupIds = env.FORCE_GROUP_IDS?.split(" ").map(Number) || [];
const allowGroups = env.ALLOW_GROUPS?.split(" ").map(Number) || [];
const withoutCmd = env.ALLOW_GROUPS_WITHOUT_COMMAND?.split(" ").map(Number) || [];
const adminIds = env.ADMIN_IDS?.split(" ").map(Number);
const ownerId = Number(env.OWNER_ID) || 0;
const databaseUrl = env.DATABASE_URL;
const join = env.JOIN || "";
const backup = env.BACKUP || "";
const request = env.REQUEST || "";
const joinAnime = env.JOIN_ANIME || "";
const collectionAIO = Number(env.COLLECTION_AIO) || "";
const collectionHindi = Number(env.COLLECTION_HINDI) || "";
const collectionOngoing = Number(env.ONGOING_COLLECTION) || "";
const collectionAIOBackup = Number(env.COLLECTION_AIO_BACKUP) || "";
const jwtSecret = env.JWT_SECRET || "randomSecretString";
const howToGenerateToken = env.HOW_TO_GENERATE_TOKEN;
const apiBaseUrl = env.API_BASE_URL;
const apiFetchToken = env.API_FETCH_TOKEN || "";

if (!token) {
  throw Error("Provide TELEGRAM_BOT_TOKEN");
}

if (!adminIds) {
  throw Error("Provide ADMIN_IDS");
}
export default {
  baseUrl,
  apiBaseUrl,
  apiFetchToken,
  ownerId,
  collectionAIOBackup,
  logGroupId,
  sortApiKey,
  token,
  botUserName,
  dbPosterLink,
  dbPosterID,
  jwtSecret,
  development,
  webhookDomain,
  port,
  channelSourceLink,
  join,
  howToGenerateToken,
  backup,
  howToDownload,
  dbAIOChannelId,
  dbOngoingChannelId,
  joinAnime,
  collectionHindi,
  collectionAIO,
  collectionOngoing,
  channelSource,
  request,
  forceChannelIds,
  allowGroups,
  withoutCmd,
  forceGroupIds,
  adminIds,
  databaseUrl,
  otherDomain,
};
