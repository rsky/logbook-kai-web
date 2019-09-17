import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux"

import { WebBridgeRecord } from "../../models/KCSAPIStruct"
import { LogbookState } from ".."

import { addLogData } from "../debug/actions"
import { receiveDeckPort, receiveMaterial } from "../port/actions"

import { ACTION_CONNECT, ACTION_DISCONNECT } from "./actions"

const messageHandler = (store: MiddlewareAPI<Dispatch<AnyAction>, LogbookState>) => (event: MessageEvent) => {
    const data = WebBridgeRecord.fromPayload(JSON.parse(event.data))
    const settings = store.getState().settings
    if (settings.debugMode) {
        store.dispatch(addLogData(data, settings.maxLogRecords))
    }

    const apiData = data.body.api_data
    if (!apiData) {
        return
    }

    if (apiData.api_material) {
        store.dispatch(receiveMaterial(apiData.api_material))
    }
    if (apiData.api_deck_port) {
        store.dispatch(receiveDeckPort(apiData.api_deck_port))
    }
}

const getWebSocketHost = (): string => location.protocol === "file:" ? "127.0.0.1:10080" : location.host

export const webSocketMiddleware = (): Middleware => {
    let socket: WebSocket | null = null

    return store => next => action => {
        switch (action.type) {
        case ACTION_CONNECT:
            if (socket) {
                socket.close()
            }
            socket = new WebSocket(`ws://${getWebSocketHost()}/sub`)
            socket.onmessage = messageHandler(store)
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
