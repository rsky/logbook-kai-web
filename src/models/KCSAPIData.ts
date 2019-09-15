// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = Record<string, any>

type KCSAPIPayload = {
    uri: string;
    date: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
}

export class KCSAPIData {
    uri: string;
    date: Date;
    body: Data;
    key: string;

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
