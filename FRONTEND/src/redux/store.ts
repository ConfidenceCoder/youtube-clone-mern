import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './useSlice';
import { 
    persistStore, 
    persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from "redux-persist";

const customStorage = {
    getItem: (key:string):Promise<string |null> => {
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key:string, value:string):Promise<string | null> => {
        localStorage.setItem(key, value);
        return Promise.resolve(value);
    },
    removeItem: (key:string):Promise<void> => {
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const rootReducer = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: customStorage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxstore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export const persistor = persistStore(reduxstore);  

export type RootState = ReturnType<typeof reduxstore.getState>
export type AppDispatch = typeof reduxstore.dispatch;