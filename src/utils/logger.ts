import winston from "winston";
import env from "../services/env.js";

const isDevelopment = env.development;

const transports = [];

if (isDevelopment) {
  transports.push(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

const logger = winston.createLogger({
  level: isDevelopment ? "debug" : "silent", // disable logs in production
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports,
});

export default logger;
