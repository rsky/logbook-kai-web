import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from "redux"
import { createLogger } from "redux-logger"
import { settingsReducer, SettingsState } from "./settings/reducer"
import { websocketReducer, WebSocketState } from "./websocket/reducer"

type StoreHolder = { store: Store<unknown, AnyAction> }

const storeHolder = {} as StoreHolder

export type LogbookState = {
    settings: SettingsState;
    websocket: WebSocketState;
}

export const configureStore = (): Store<unknown, AnyAction> => {
    const reducers = {
        settings: settingsReducer,
        websocket: websocketReducer,
    }
    const middlewares = []
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
