import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from "redux"
import { createLogger } from "redux-logger"

import { debugReducer, DebugState } from "./debug/reducer"
import { settingsReducer, SettingsState } from "./settings/reducer"
import { webSocketMiddleware } from "./websocket/middleware"

type StoreHolder = { store: Store<unknown, AnyAction> }

const storeHolder = {} as StoreHolder

export type LogbookState = {
    debug: DebugState;
    settings: SettingsState;
}

export const configureStore = (): Store<unknown, AnyAction> => {
    const reducers = {
        debug: debugReducer,
        settings: settingsReducer,
    }
    const middlewares = [webSocketMiddleware()]
    if (!PRODUCTION) {
        middlewares.push(createLogger({
            collapsed: true,
            diff: true,
        }))
    }
    const store = createStore(combineReducers(reducers), applyMiddleware(...middlewares))
    storeHolder.store = store
    return store
}

export const getStore = (): Store => storeHolder.store
