import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux"

import { KCSAPIData } from "../../models/KCSAPIData"
import { LogbookState } from ".."

import { addLogData } from "../debug/actions"
import { receiveDeckPort, receiveMaterial } from "../port/actions"

import { ACTION_CONNECT, ACTION_DISCONNECT } from "./actions"

const messageHandler = (store: MiddlewareAPI<Dispatch<AnyAction>, LogbookState>) => (event: MessageEvent) => {
    const root = KCSAPIData.fromPayload(JSON.parse(event.data))
    const settings = store.getState().settings
    if (settings.debugMode) {
        store.dispatch(addLogData(root, settings.maxLogRecords))
    }

    const data = root.body.api_data
    if (!data) {
        return
    }

    if (data.api_material) {
        store.dispatch(receiveMaterial(data.api_material))
    }
    if (data.api_deck_port) {
        store.dispatch(receiveDeckPort(data.api_deck_port))
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
