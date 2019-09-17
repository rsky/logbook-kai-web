/* eslint-disable @typescript-eslint/no-explicit-any */

type Dict<T> = Record<string, T>

type AnyDict = Dict<any>

type IdAndValue = {
    api_id: number;
    api_value: number;
}

type WebBridgePayload = {
    uri: string;
    date: number;
    body: any;
}

/* eslint-enable */

class WebBridgeRecord {
    readonly uri: string;
    readonly date: Date;
    readonly body: AnyDict;
    readonly key: string;

    constructor (uri: string, date: number, body: AnyDict) {
        this.uri = uri
        this.date = new Date(date)
        this.body = body
        this.key = `${date}:${uri}`
    }

    static fromPayload (payload: WebBridgePayload): WebBridgeRecord {
        return new WebBridgeRecord(payload.uri, payload.date, payload.body)
    }
}

export {
    AnyDict,
    Dict,
    IdAndValue,
    WebBridgeRecord,
}
