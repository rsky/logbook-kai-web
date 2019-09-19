import { AnyAction, Dispatch } from "redux"
import { WebBridgeRecord } from "../models/KCSAPIStruct"
import { WebBridgeListener } from "."

export default class Listener implements WebBridgeListener {
    targets(): string[] | null {
        return null
    }

    accept(dispatch: Dispatch<AnyAction>, record: WebBridgeRecord): void {
        const apiData = record.body.api_data
        if (!apiData) {
            return
        }

        // do stuff
    }
}
