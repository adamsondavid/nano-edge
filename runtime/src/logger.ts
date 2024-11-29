import winston from "winston";
import LokiTransport from "winston-loki";

export const logger = winston.createLogger({
  transports: [new LokiTransport({
    host: "http://loki:3100",
    gracefulShutdown: false,
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    format: winston.format.json(),
  })]
});
