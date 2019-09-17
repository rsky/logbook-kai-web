import { handleActions } from "redux-actions"
import { WebBridgeRecord } from "../../models/KCSAPIStruct"
import { ACTION_ADD_LOG_DATA, ACTION_SELECT_LOG_DATA, ACTION_TRUNCATE_LOG_DATA, PayloadType } from "./actions"

export type DebugState = {
    selectedData?: WebBridgeRecord;
    logData: Array<WebBridgeRecord>;
}

const getInitialState = (): DebugState => ({
    selectedData: undefined,
    logData: [],
})

export const debugReducer = handleActions<DebugState, PayloadType>({
    [ACTION_ADD_LOG_DATA]: (state, action) => {
        const data = action.payload.data as WebBridgeRecord
        const limit = action.payload.limit as number
        let logData: WebBridgeRecord[]
        if (limit > 0) {
            logData = [data, ...state.logData.slice(0, limit - 1)]
        } else if (limit < 0) {
            logData = [data, ...state.logData]
        } else {
            logData = []
        }
        return { ...state, logData }
    },
    [ACTION_SELECT_LOG_DATA]: (state, action) => {
        const index = action.payload.index as number
        const selectedData = state.logData[index]
        return { ...state, selectedData }
    },
    [ACTION_TRUNCATE_LOG_DATA]: () => getInitialState(),
}, getInitialState())
