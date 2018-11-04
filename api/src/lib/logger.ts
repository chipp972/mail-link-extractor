import { createLogger, format, Logger, transports } from 'winston';

interface Props {
  isDev: boolean;
}

export function initLogger({ isDev }: Props) {
  const loggerFormat = [
    isDev ? format.colorize() : format.uncolorize(),
    format.timestamp(),
    isDev ? format.cli() : format.json(),
  ];
  const console = new transports.Console({
    handleExceptions: true,
    level: isDev ? 'debug' : 'info',
    format: format.combine(...loggerFormat),
  });
  const logger: Logger = createLogger({ exitOnError: true });
  logger.add(console);
  return logger;
}

export default initLogger;
