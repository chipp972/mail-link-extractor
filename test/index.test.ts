const helloWorld = () => 'Hello world';

describe('Hello World', function() {
  it('should work', async function() {
    const res = await helloWorld();
    expect(res).toEqual('Hello world');
  });
});
