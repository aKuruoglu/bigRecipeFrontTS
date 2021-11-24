import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { useDispatch } from 'react-redux';

import rootSaga from './rootSaga';
import { rootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore( {
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat( sagaMiddleware ),
} );

sagaMiddleware.run( rootSaga );

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
