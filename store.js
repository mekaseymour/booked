import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AsyncStorage } from 'react-native';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';
import { toPastBooks } from './transformers/asyncStorageToState';

const INITIAL_STATE = {};

const middleware = applyMiddleware(promise, thunk, logger);

const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

AsyncStorage.getAllKeys().then(keys =>
  AsyncStorage.multiGet(keys).then(result => {
    result.forEach(r => {
      const key = r[0];
      const value = r[1];

      switch (key) {
        case 'pastBooks':
          store.dispatch({ type: 'LOAD_INITIAL_PAST_BOOKS', payload: toPastBooks(r) });
        case 'currentBook':
          const data = {};
          data[key] = JSON.parse(value);

          store.dispatch({ type: 'LOAD_INITIAL_DATA', payload: data });
      }
    });
  })
);

export default store;
