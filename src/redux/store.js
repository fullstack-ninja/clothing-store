import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

import rootSaga from './root-saga';

const sageMiddleware = createSagaMiddleware();

const middlewares = [sageMiddleware];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sageMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };