import {combineReducers} from '@reduxjs/toolkit';
import {api} from '../services/api';
import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';

import auth from './auth';
import theme from './theme';
import events from './events';
import myShifts from './myShifts';
import attendence from './attendence';
import eventSetting from './eventSetting';
import common from './common';

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth', 'common'],
};

const reducers = combineReducers({
  auth,
  theme,
  events,
  myShifts,
  attendence,
  common,
  eventSetting,
  [api.reducerPath]: api.reducer,
});

export default reducers;
