import { clearState, retrieveState, updateState } from './persistence';

describe('persistence', () => {
  test('updateState', async () => {
    const state = await updateState({ a: 'a' });
    expect(state).toStrictEqual({ a: 'a' });
  });

  test('retrieveState', async () => {
    const state = await retrieveState();
    expect(state).toStrictEqual({ a: 'a' });
  });

  test('clearState', async () => {
    const state = await clearState();
    expect(state).toStrictEqual({});
  });
});
