import { handleActions } from "redux-actions"
import {
    ACTION_CONNECT,
    ACTION_DISCONNECT,
    ACTION_ON_MESSAGE,
    ACTION_SET_HOST,
    ACTION_SET_PORT,
    PayloadType,
    onMessage,
} from "./actions"
import { getStore } from ".."
import { getStorage } from "../../utils/storage"

const WEBSOCKET_HOST_KEY = "logbook.websocket.host"
const WEBSOCKET_PORT_KEY = "logbook.websocket.port"

const defaultSettings = {
    host: "127.0.0.1",
    port: 5000,
}

export type WebSocketState = {
    host: string;
    port: number;
    ws: WebSocket | null;
    configurationChanged: boolean;
}

const initialState: WebSocketState = (() => {
    const state = {} as WebSocketState
    const storage = getStorage()

    const savedHost = storage.getItem(WEBSOCKET_HOST_KEY)
    if (savedHost) {
        state.host = savedHost
    } else {
        state.host = defaultSettings.host
    }

    const savedPort = storage.getItem(WEBSOCKET_PORT_KEY)
    if (savedPort) {
        state.port = parseInt(savedPort, 10)
    } else {
        state.port = defaultSettings.port
    }

    state.ws = null
    state.configurationChanged = false

    return state
})()

export const websocketReducer = handleActions<WebSocketState, PayloadType>({
    [ACTION_CONNECT]: state => {
        if (state.ws) {
            state.ws.close()
        }
        const ws = new WebSocket(`ws://${state.host}:${state.port}`)
        ws.addEventListener("message", event => {
            getStore().dispatch(onMessage(event.data))
        })
        return { ...state, ws, configurationChanged: false }
    },
    [ACTION_DISCONNECT]: state => {
        if (state.ws) {
            state.ws.close()
        }
        return { ...state, ws: null, configurationChanged: false }
    },
    [ACTION_ON_MESSAGE]: (state, action) => {
        console.log(action.payload.message)
        return state
    },
    [ACTION_SET_HOST]: (state, action) => {
        let host = action.payload.host
        if (host) {
            getStorage().setItem(WEBSOCKET_HOST_KEY, host)
        } else {
            getStorage().removeItem(WEBSOCKET_HOST_KEY)
            host = defaultSettings.host
        }
        return { ...state, host, configurationChanged: true }
    },
    [ACTION_SET_PORT]: (state, action) => {
        const value = action.payload.port
        let port
        if (value) {
            port = parseInt(value, 10)
            getStorage().setItem(WEBSOCKET_PORT_KEY, value)
        } else {
            getStorage().removeItem(WEBSOCKET_PORT_KEY)
            port = defaultSettings.port
        }
        return { ...state, port, configurationChanged: true }
    },
}, initialState)
