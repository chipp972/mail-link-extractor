import getConfig from './index';

describe('config', () => {
  it('should contain env', () => {
    const config = getConfig();
    expect(config.env).toBeDefined();
  });
});
