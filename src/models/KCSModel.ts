/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class KCSModel {
    private _rawData: any;

    constructor (data: any) {
        this._rawData = data
    }

    getRawData (): any {
        return this._rawData
    }
}
/* eslint-enable */
