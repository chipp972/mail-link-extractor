/**
 * @callback ReducerFunction
 * @param {*} state current redux state
 * @param {*} data payload of the dispatched action
 * @returns {*} new state
 */

/**
 *
 * @param {Object.<string, ReducerFunction>} reducerObject
 * @param {*} defaultState
 */
export const createReducer = (reducerObject, defaultState) => (state, { type, data }) => {
  const reducerEntry = Object.entries(reducerObject).find(([actionType]) => type === actionType);
  return reducerEntry ? reducerEntry[1](state || defaultState, data) : state || defaultState;
};
