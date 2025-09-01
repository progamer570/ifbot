import winston from "winston";
import env from "../services/env.js";
var isDevelopment = env.development;
var transports = [];
if (isDevelopment) {
    transports.push(new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }));
}
var logger = winston.createLogger({
    level: isDevelopment ? "debug" : "silent", // disable logs in production
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
    transports: transports,
});
export default logger;
