import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux"

import { addLogData } from "../debug/actions"
import { APIListener, ListenersMap, listenersToMap, loadAllListeners } from "../../listeners"
import { WebBridgeRecord } from "../../models/KCSAPIStruct"
import { getWebSocketURI } from "../../utils/webapp"
import { LogbookState } from ".."

import { ACTION_CONNECT, ACTION_DISCONNECT } from "./actions"

const messageHandler = (
    store: MiddlewareAPI<Dispatch<AnyAction>, LogbookState>,
    listenersMap: ListenersMap,
) => (event: MessageEvent) => {
    const record = WebBridgeRecord.fromPayload(JSON.parse(event.data))
    const settings = store.getState().settings
    const dispatch = store.dispatch
    const { body, uri } = record

    // `/kcsapi/api_start2/getData` is too large to dump
    if (settings.debugMode && uri !== "/kcsapi/api_start2/getData") {
        dispatch(addLogData(record, settings.maxLogRecords))
    }

    const acceptFunc = (listener: APIListener): void => listener.accept(dispatch, body)
    listenersMap.all.forEach(acceptFunc)
    if (listenersMap[uri]) {
        listenersMap[uri].forEach(acceptFunc)
    }
}

export const webSocketMiddleware = (): Middleware => {
    const listenersMap = listenersToMap(loadAllListeners())
    let socket: WebSocket | null = null

    return store => next => action => {
        switch (action.type) {
        case ACTION_CONNECT:
            if (socket) {
                socket.close()
            }
            socket = new WebSocket(getWebSocketURI())
            socket.onmessage = messageHandler(store, listenersMap)
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
