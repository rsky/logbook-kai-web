/* eslint-disable @typescript-eslint/no-explicit-any */
export class KCSModel {
    private rawData: any;

    constructor (data: any) {
        this.rawData = data
    }

    getRawData (): any {
        return this.rawData
    }
}
/* eslint-enable */
