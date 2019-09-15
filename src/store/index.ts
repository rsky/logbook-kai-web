import { applyMiddleware, combineReducers, createStore, Store } from "redux"
import { createLogger } from "redux-logger"

import { debugReducer, DebugState } from "./debug/reducer"
import { portReducer, PortState } from "./port/reducer"
import { settingsReducer, SettingsState } from "./settings/reducer"
import { webSocketMiddleware } from "./websocket/middleware"

export type LogbookState = {
    debug: DebugState;
    port: PortState;
    settings: SettingsState;
}

export const configureStore = (): Store => {
    const reducers = {
        debug: debugReducer,
        port: portReducer,
        settings: settingsReducer,
    }
    const middlewares = [webSocketMiddleware()]
    if (!PRODUCTION) {
        middlewares.push(createLogger({
            collapsed: true,
            diff: true,
        }))
    }
    return createStore(combineReducers(reducers), applyMiddleware(...middlewares))
}
