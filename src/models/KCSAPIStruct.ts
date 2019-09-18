/* eslint-disable @typescript-eslint/no-explicit-any */

type Dict<T> = Record<string, T>

type AnyDict = Dict<any>

type IdAndValue = {
    api_id: number;
    api_value: number;
}

type WebBridgePayload = {
    uri: string;
    time: number;
    body: any;
}

/* eslint-enable */

class WebBridgeRecord {
    readonly uri: string;
    readonly date: Date;
    readonly body: AnyDict;
    readonly key: string;

    constructor (uri: string, timestamp: number, body: AnyDict) {
        this.uri = uri
        this.date = new Date(timestamp)
        this.body = body
        this.key = `${timestamp}:${uri}`
    }

    static fromPayload (payload: WebBridgePayload): WebBridgeRecord {
        return new WebBridgeRecord(payload.uri, payload.time, payload.body)
    }
}

export {
    AnyDict,
    Dict,
    IdAndValue,
    WebBridgeRecord,
}
