import { getExpressRegistry } from 'express-registry';
import { createLogger, format, Logger, transports } from 'winston';

export default function getLogger() {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { env } = registry.getConfig();

  const logger: Logger = createLogger({
    exitOnError: true,
    transports: [
      new transports.Console({
        handleExceptions: true,
        level: env.isDebug ? 'debug' : 'info',
        format: format.combine(format.colorize()),
      }),
    ],
  });

  return logger;
}
