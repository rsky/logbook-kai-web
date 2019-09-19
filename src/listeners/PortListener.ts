import { AnyAction, Dispatch } from "redux"
import { AnyMap } from "../models/KCSAPIStruct"
import { APIListener } from "."

import { receiveDeckPort, receiveMaterial } from "../store/port/actions"

export default class PortListener implements APIListener {
    targets (): string[] | null {
        return ["/kcsapi/api_port/port"]
    }

    accept (dispatch: Dispatch<AnyAction>, response: AnyMap): void {
        const apiData = response.api_data
        if (!apiData) {
            return
        }

        if (apiData.api_material) {
            dispatch(receiveMaterial(apiData.api_material))
        }

        if (apiData.api_deck_port) {
            dispatch(receiveDeckPort(apiData.api_deck_port))
        }
    }
}
