import { AnyAction, Store, combineReducers, createStore } from "redux"
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
    const store = createStore(combineReducers(reducers))
    storeHolder.store = store
    return store
}

export const getStore = (): Store => storeHolder.store
