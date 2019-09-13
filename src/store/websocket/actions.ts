import { createAction } from "redux-actions"

const ACTION_CONNECT = "WEBSOCKET_CONNECT"
const ACTION_DISCONNECT = "WEBSOCKET_DISCONNECT"
const ACTION_ON_MESSAGE = "WEBSOCKET_ON_MESSAGE"
const ACTION_SET_HOST = "WEBSOCKET_SET_HOST"
const ACTION_SET_PORT = "WEBSOCKET_SET_PORT"

const connect = createAction(ACTION_CONNECT, () => ({}))
const disconnect = createAction(ACTION_DISCONNECT, () => ({}))
const onMessage = createAction(ACTION_ON_MESSAGE, (message: string) => ({ message }))
const setHost = createAction(ACTION_SET_HOST, (host: string) => ({ host }))
const setPort = createAction(ACTION_SET_PORT, (port: string) => ({ port }))

type PayloadType = Record<string, string>

export {
    ACTION_CONNECT,
    ACTION_DISCONNECT,
    ACTION_ON_MESSAGE,
    ACTION_SET_HOST,
    ACTION_SET_PORT,
    PayloadType,
    connect,
    disconnect,
    onMessage,
    setHost,
    setPort,
}
