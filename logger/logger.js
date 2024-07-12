import winston, { createLogger, transports, format } from "winston";
import "winston-mongodb";
import dotenv from "dotenv";

dotenv.config();

const option = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleException: true,
    format: format.combine(format.timestamp(), format.json()),
    maxSize: 5242880,
    maxFile: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleException: true,
    format: format.combine(format.timestamp(), format.json()),
    colorize: true,
  },
};

const logger = createLogger({
  levels: winston.config.npm.levels,

  transports: [
    new transports.File(option.file),
    new transports.Console(option.console),
  ],
});

export default logger;
