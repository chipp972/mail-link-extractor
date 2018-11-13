import { createLogger, format, Logger, transports } from 'winston';
import { Env } from '../typedef';

export function initLogger({ logger: { level, hasColor, isJSONFormat } }: Env) {
  const loggerFormat = [
    hasColor ? format.colorize() : format.uncolorize(),
    format.timestamp(),
    isJSONFormat ? format.json() : format.cli(),
  ];
  const consoleLogger = new transports.Console({
    handleExceptions: true,
    level,
    format: format.combine(...loggerFormat),
  });
  const logger: Logger = createLogger({ exitOnError: true });
  logger.add(consoleLogger);
  return logger;
}

export default initLogger;
