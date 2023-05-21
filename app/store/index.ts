import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { isDevelopement } from '../shared/baseUrl';
import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';
import Asyncstorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: Asyncstorage,
  whitelist: ['themeColor', 'user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
let store: any = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
