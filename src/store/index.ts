import { AnyAction, Store, combineReducers, createStore } from "redux"
import { settingsReducer } from "./settings/reducer"
import { websocketReducer } from "./websocket/reducer"

type StoreHolder = { store: Store<unknown, AnyAction> }

const storeHolder = {} as StoreHolder

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
