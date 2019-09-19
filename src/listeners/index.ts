import { AnyAction, Dispatch } from "redux"
import { AnyMap } from "../models/KCSAPIStruct"

interface APIListener {
    targets(): string[] | null;
    accept(dispatch: Dispatch<AnyAction>, response: AnyMap): void;
}

type WritableListenersMap = {
    all: APIListener[];
    [api: string]: APIListener[];
}

type ListenersMap = {
    readonly all: ReadonlyArray<APIListener>;
    readonly [api: string]: ReadonlyArray<APIListener>;
}

const listenersToMap = (listeners: ReadonlyArray<APIListener>): ListenersMap => {
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

const loadAllListeners = (): ReadonlyArray<APIListener> => {
    const context = require.context("./", false, /[A-Z][0-9A-Za-z]*Listener\.ts$/)
    return context.keys().map((path: string) => {
        const Listener = context(path).default
        return new Listener()
    })
}

export {
    APIListener,
    ListenersMap,
    listenersToMap,
    loadAllListeners,
}
