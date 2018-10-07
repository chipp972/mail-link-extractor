import initLogger from './logger';

describe('Logger', () => {
  let logger: any;

  beforeEach(() => {
    logger = initLogger({ isDebug: true });
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  test.each(['info', 'debug', 'error'])('should have method %s', (method: string) => {
    expect(logger[method]).toBeDefined();
    expect(logger[method].bind(logger, 'test')).not.toThrow();
  });

  it('should have to specify level for log method', () => {
    expect(logger.log).toBeDefined();
    expect(logger.log.bind(logger, 'silly', 'test')).not.toThrow();
    expect(logger.log.bind(logger, { level: 'silly', message: 'test' })).not.toThrow();
  });
});
