import { createLogger, transports, format } from "winston"

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({
      filename: "filelog-error.log",
      level: "error",
    }),
  ],
})
