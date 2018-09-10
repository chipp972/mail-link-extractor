import getExpressMiddlewares from './express';
describe('express middlewares', () => {
  it('should return a list of middlewares', () => {
    const mw = getExpressMiddlewares();
    expect(mw).toHaveLength(4);
  });
});
