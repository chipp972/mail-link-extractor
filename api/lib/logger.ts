import { injectRegistry } from 'singleton-module-registry';
import { createLogger, format, Logger, transports } from 'winston';

interface Props {
  isDebug: boolean;
}

export function getLogger({ isDebug }: Props) {
  const console = new transports.Console({
    handleExceptions: true,
    level: isDebug ? 'debug' : 'info',
    format: format.combine(format.colorize()),
  });
  const logger: Logger = createLogger({ exitOnError: true });
  logger.add(console);
  return logger;
}

export default injectRegistry<any, any, Logger>((registry) => ({
  isDebug: registry.env.isDebug,
}))(getLogger);
