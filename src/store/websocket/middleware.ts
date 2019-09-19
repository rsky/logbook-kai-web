import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux"

import { addLogData } from "../debug/actions"
import { listenersToMap, loadAllListeners, ListenersMap } from "../../listeners"
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

    // `/kcsapi/api_start2/getData` is too large to dump
    if (settings.debugMode && record.uri !== "/kcsapi/api_start2/getData") {
        dispatch(addLogData(record, settings.maxLogRecords))
    }

    listenersMap.all.forEach(listener => listener.accept(dispatch, record))
    if (listenersMap[record.uri]) {
        listenersMap[record.uri].forEach(listener => listener.accept(dispatch, record))
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
