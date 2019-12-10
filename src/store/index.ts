import { Store } from "redux"
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"

import { debugReducer, DebugState } from "./debug"
import { portReducer, PortState } from "./port/reducer"
import { settingsReducer, SettingsState } from "./settings/reducer"
import { webSocketMiddleware } from "./websocket/middleware"

export type LogbookState = {
    debug: DebugState;
    port: PortState;
    settings: SettingsState;
}

export const setupStore = (): Store => {
    const rootReducer = combineReducers({
        debug: debugReducer,
        port: portReducer,
        settings: settingsReducer,
    })
    const middlewares = [...getDefaultMiddleware(), webSocketMiddleware()]
    if (!PRODUCTION) {
        middlewares.push(createLogger({
            collapsed: true,
            diff: true,
        }))
    }
    return configureStore({
        reducer: rootReducer,
        middleware: middlewares,
    })
}
