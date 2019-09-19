import { AnyAction, Dispatch } from "redux"
import { WebBridgeRecord } from "../models/KCSAPIStruct"

interface WebBridgeListener {
    targets(): string[] | null;
    accept(dispatch: Dispatch<AnyAction>, record: WebBridgeRecord): void;
}

type WritableListenersMap = {
    all: WebBridgeListener[];
    [api: string]: WebBridgeListener[];
}

type ListenersMap = {
    readonly all: ReadonlyArray<WebBridgeListener>;
    readonly [api: string]: ReadonlyArray<WebBridgeListener>;
}

const listenersToMap = (listeners: ReadonlyArray<WebBridgeListener>): ListenersMap => {
    const map = { all: [] } as WritableListenersMap
    listeners.forEach(listener => {
        const targets = listener.targets()
        if (targets === null) {
            map.all.push(listener)
        } else {
            targets.forEach(target => {
                if (map[target]) {
                    map[target].push(listener)
                } else {
                    map[target] = [listener]
                }
            })
        }
    })
    return map
}

const loadAllListeners = (): ReadonlyArray<WebBridgeListener> => {
    const context = require.context("./", false, /[A-Z][0-9A-Za-z]*Listener\.ts$/)
    return context.keys().map((path: string) => {
        const Listener = context(path).default
        return new Listener()
    })
}

export {
    WebBridgeListener,
    ListenersMap,
    listenersToMap,
    loadAllListeners,
}
