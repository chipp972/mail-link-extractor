import store from 'localforage';

store.config({
  driver: [store.INDEXEDDB, store.WEBSQL, store.LOCALSTORAGE],
  name: 'mail-link-extractor',
  version: 1.0,
  storeName: 'state',
  description: 'react app state',
});

export async function clearState() {
  try {
    const state = (await store.clear()) || {};
    return state;
  } catch (err) {
    // console.log('error while clearing state ', err.message);
    // TODO: use a real logger
    return {};
  }
}

export async function retrieveState() {
  try {
    const state = (await store.getItem('state')) || {};
    return state;
  } catch (err) {
    // console.log('error while retrieving state ', err.message);
    // TODO: use a real logger
    return {};
  }
}

export async function updateState(state) {
  try {
    const currentState = (await store.getItem('state')) || {};
    await store.setItem('state', { ...currentState, ...state });
    return state;
  } catch (err) {
    // console.log('error while updating state ', err.message);
    // TODO: use a real logger
    return {};
  }
}
