import { createLogger, format, Logger, transports } from 'winston';

interface Props {
  isDebug: boolean;
}

export function initLogger({ isDebug }: Props) {
  const loggerFormat = [
    isDebug ? format.uncolorize() : format.colorize(),
    format.timestamp(),
    isDebug ? format.json() : format.cli(),
  ];
  const console = new transports.Console({
    handleExceptions: true,
    level: isDebug ? 'debug' : 'info',
    format: format.combine(...loggerFormat),
  });
  const logger: Logger = createLogger({ exitOnError: true });
  logger.add(console);
  return logger;
}

export default initLogger;
