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

let socket = io(API_URL, { autoConnect: false});
// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const log =  createLogger({ diff: true, collapsed: true });

let socketIoMiddleware = null;
let middleware = null;
let oldToken;
const proxyMiddleware = store => next => action => {
    // const store = api.getState();
//     const auth = store ? store.getState().login : {};
//     console.log("Auth store", auth)
//   if (socketIoMiddleware !== null) {
//      return socketIoMiddleware(store)(next)(action);
//   } else {
//     const socket = io.connect(API_URL, {
//         'query': 'token=' + auth.token
//     });
//     socketIoMiddleware = createSocketIoMiddleware(socket, "server/");;
//   }
//   return next(action);
if (!middleware) {
    const auth = store ? store.getState().login : {};
    // console.log("This is the auth token: ", auth.token);
    // console.log("This is the old auth token: ", oldToken);
    if (auth.token !== oldToken) {
        console.log("Connecting to Socket.IO")
        const socket = io(API_URL, {
            query: {
                token: auth.token
            }
        })
        .on('connect', () => console.log("Reconnected"))
        .on('unauthorized', (error) => {
            console.log('Socket IO - Unauthorized:', error);
            if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
                console.log("Login Error: ", error.data.message);
            }            
            // socket.disconnect();
        })
        .on('error', (error) => {
            console.log('Socket Io Error: ', error);
            if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
                // redirect user to login page perhaps?
                console.log("Login Error: ", error.message);
            }            
            socket.disconnect();
        });

        middleware = createSocketIoMiddleware(socket, 'server/');
        oldToken = auth.token;
    } else {
        return next(action);
    }
}
return middleware(store)(next)(action);
}
// let store = applyMiddleware(proxyMiddleware)(createStore)(reducer);

export const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['alerts', 'form']
}

const persistedReducer = persistReducer(persistConfig,  makeRootReducer())

// a function which can create our store and auto-persist the data
export default function configureStore(initialState = {}) {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk, log, proxyMiddleware];

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

    // socketIoMiddleware = createSocketIoMiddleware(socket, "server/");;
    return {store, persistor };
};