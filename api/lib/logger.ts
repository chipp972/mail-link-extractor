import { injectRegistry } from 'singleton-module-registry';
import { createLogger, format, Logger, transports } from 'winston';

export function getLogger({ isDebug }: { isDebug: boolean }) {
  const logger: Logger = createLogger({
    exitOnError: true,
    transports: [
      new transports.Console({
        handleExceptions: true,
        level: isDebug ? 'debug' : 'info',
        format: format.combine(format.colorize()),
      }),
    ],
  });

  return logger;
}

export default injectRegistry<any, { isDebug: boolean }, Logger>((registry) => ({
  isDebug: registry.env.isDebug,
}))(getLogger);
