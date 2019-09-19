import { AnyAction, Dispatch } from "redux"
import { AnyMap } from "../models/KCSAPIStruct"
import { APIListener } from "."

export default class Listener implements APIListener {
    targets(): string[] | null {
        return null
    }

    accept(dispatch: Dispatch<AnyAction>, response: AnyMap): void {
        const apiData = response.api_data
        if (!apiData) {
            return
        }

        // do stuff
    }
}
