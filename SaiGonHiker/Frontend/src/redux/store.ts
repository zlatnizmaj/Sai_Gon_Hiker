import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from 'src/containers/Authorize/reducer';
import userReducer from 'src/containers/ManageUser/reducer';
import assetReducer from 'src/containers/ManageAsset/reducer';
import assignmentReducer from 'src/containers/ManageAssignment/reducer';
import myassignmentReducer from 'src/containers/MyAssignment/reducer';

import rootSaga from './sagas/rootSaga';

const reducer = combineReducers({
    authReducer,
    userReducer,
    assetReducer,
    assignmentReducer,
    myassignmentReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }),
        sagaMiddleware
    ],
});

rootSaga.map(saga => sagaMiddleware.run(saga))  // Register all sagas

// sagaMiddleware.run(watcherSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
