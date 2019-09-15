import { createAction } from "redux-actions"

const ACTION_CONNECT = "WEBSOCKET_CONNECT"
const ACTION_DISCONNECT = "WEBSOCKET_DISCONNECT"

const connect = createAction(ACTION_CONNECT, () => ({}))
const disconnect = createAction(ACTION_DISCONNECT, () => ({}))

export {
    ACTION_CONNECT,
    ACTION_DISCONNECT,
    connect,
    disconnect,
}
