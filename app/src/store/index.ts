import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	persistedReducer,
	compose(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
