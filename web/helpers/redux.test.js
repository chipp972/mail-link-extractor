import { createReducer } from './redux';

describe('createReducer', () => {
  it('should create a reducer from the object', () => {
    const reducer = createReducer({
      increment: (state) => state + 1,
    });
    expect(reducer(1, { type: 'increment' })).toEqual(2);
  });

  it('should use defaultState if no state is provided', () => {
    const reducer = createReducer(
      {
        increment: (state) => state + 1,
      },
      3
    );
    expect(reducer(null, { type: 'increment' })).toEqual(4);
  });

  it('should return state if no action is corresponding', () => {
    const reducer = createReducer(
      {
        increment: (state) => state + 1,
      },
      3
    );
    expect(reducer(2, { type: 'decrement' })).toEqual(2);
    expect(reducer(null, { type: 'decrement' })).toEqual(3);
  });

  it('should pass the data to the reducer function', () => {
    const reducer = createReducer({
      increment: (state, { nb }) => state + nb,
    });
    expect(reducer(1, { type: 'increment', data: { nb: 2 } })).toEqual(3);
  });
});
