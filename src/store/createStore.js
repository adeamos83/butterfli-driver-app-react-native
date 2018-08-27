import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import createSocketIoMiddleware from "redux-socket.io";

import io from "socket.io-client/dist/socket.io";
import { API_URL } from '../api' 

let socket = io(API_URL, {jsonp:false, 'force new connection':true, reconnection: true});
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const log =  createLogger({ diff: true, collapsed: true });

export const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig,  makeRootReducer())

// a function which can create our store and auto-persist the data
export default function configureStore(initialState = {}) {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk, log, socketIoMiddleware];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];
    // socket.on('connect', () => console.log("connected"));
    // socket.on('disconnect', function() {
    //     console.log("Store reconnecting to socket io")
    //    socket.connect();
    // });
    // ======================================================
    // Store Instantiation
    // ======================================================
    const store = createStore(
        persistedReducer, 
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    const persistor = persistStore(store, null, () => {
        console.log("Store has be reloaded!")
    });   
    return {store, persistor };
};