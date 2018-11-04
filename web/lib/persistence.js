import store from 'localforage';

export const clearState = async () => {
  try {
    if (!process.browser) return {};
    const state = (await store.clear()) || {};
    return state;
  } catch (err) {
    console.error('error while clearing state ', err.message);
    return {};
  }
};

export const retrieveState = async () => {
  try {
    if (!process.browser) return {};
    const state = (await store.getItem('state')) || {};
    return state;
  } catch (err) {
    console.error('error while retrieving state ', err.message);
    return {};
  }
};

export const updateState = async (state) => {
  try {
    if (!process.browser) return {};
    const currentState = (await store.getItem('state')) || {};
    await store.setItem('state', { ...currentState, ...state });
    return state;
  } catch (err) {
    console.error('error while updating state ', err.message);
    return {};
  }
};

export const initStore = async () => {
  try {
    if (!process.browser) return;
    store.config({
      driver: [store.INDEXEDDB, store.WEBSQL, store.LOCALSTORAGE],
      name: 'mail-link-extractor',
      version: 3.0,
      storeName: 'state',
      description: 'react app state',
    });
    await store.ready();
  } catch (err) {
    console.error(err);
  }
};
