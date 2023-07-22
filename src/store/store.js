import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { chatReducer } from './reducers/chatReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    chat: chatReducer,
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);