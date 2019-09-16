// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>

export type IdAndValue = {
    api_id: number;
    api_value: number;
}

type KCSAPIPayload = {
    uri: string;
    date: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
}

export class KCSAPIData {
    readonly uri: string;
    readonly date: Date;
    readonly body: Data;
    readonly key: string;

    constructor (uri: string, date: number, body: Data) {
        this.uri = uri
        this.date = new Date(date)
        this.body = body
        this.key = `${date}:${uri}`
    }

    static fromPayload (payload: KCSAPIPayload): KCSAPIData {
        return new KCSAPIData(payload.uri, payload.date, payload.body)
    }
}
