import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux"
import { KCSAPIPayload } from "../../models/KCSAPIPayload"
import { LogbookState } from ".."
import { addLogData } from "../debug/actions"
import { ACTION_CONNECT, ACTION_DISCONNECT } from "./actions"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeMessageHandler = (store: MiddlewareAPI<Dispatch<AnyAction>, any>) => (event: MessageEvent) => {
    const payload = JSON.parse(event.data) as KCSAPIPayload
    const settings = (store.getState() as LogbookState).settings
    if (settings.debugMode) {
        store.dispatch(addLogData(payload, settings.maxLogRecords))
    }
}

const getWebSocketHost = (): String => PRODUCTION ? location.host : "127.0.0.1:10080"

export const webSocketMiddleware = (): Middleware => {
    let socket: WebSocket | null = null

    return store => next => action => {
        switch (action.type) {
        case ACTION_CONNECT:
            if (socket) {
                socket.close()
            }
            socket = new WebSocket(`ws://${getWebSocketHost()}/sub`)
            socket.onmessage = makeMessageHandler(store)
            break
        case ACTION_DISCONNECT:
            if (socket) {
                socket.close()
            }
            socket = null
            break
        default:
            return next(action)
        }
    }
}
