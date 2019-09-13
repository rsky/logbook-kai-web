import { AnyAction, Store, combineReducers, createStore } from "redux"
import { websocketReducer } from "./websocket/reducer"

type StoreHolder = { store: Store<unknown, AnyAction> }

const storeHolder = {} as StoreHolder

export const configureStore = (): Store<unknown, AnyAction> => {
    const rootReducer = combineReducers({
        websocket: websocketReducer,
    })
    const store = createStore(rootReducer)
    storeHolder.store = store
    return store
}

export const getStore = (): Store => storeHolder.store
