import { AnyAction, Dispatch } from "redux"
import { WebBridgeRecord } from "../models/KCSAPIStruct"
import { WebBridgeListener } from "."

import { receiveDeckPort, receiveMaterial } from "../store/port/actions"

export default class PortListener implements WebBridgeListener {
    targets (): string[] | null {
        return ["/kcsapi/api_port/port"]
    }

    accept (dispatch: Dispatch<AnyAction>, record: WebBridgeRecord): void {
        const apiData = record.body.api_data
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
