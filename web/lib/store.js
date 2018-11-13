import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import googleAuth from '../components/google-auth/reducer';

export const appReducer = combineReducers({
  googleAuth,
});

export const middlewares = [thunk, logger];

export const makeStore = () =>
  createStore(appReducer, composeWithDevTools(applyMiddleware(...middlewares)));
