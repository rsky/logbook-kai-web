import { handleActions } from "redux-actions"
import { KCSAPIPayload } from "../../models/KCSAPIPayload"
import {
    ACTION_ADD_LOG_DATA,
    ACTION_SELECT_LOG_DATA,
    ACTION_TRUNCATE_LOG_DATA,
    PayloadType,
} from "./actions"

export type DebugState = {
    selectedData?: KCSAPIPayload;
    logData: Array<KCSAPIPayload>;
}

const getIniitalState = (): DebugState => ({
    selectedData: undefined,
    logData: [],
})

export const debugReducer = handleActions<DebugState, PayloadType>({
    [ACTION_ADD_LOG_DATA]: (state, action) => {
        const data = action.payload.data as KCSAPIPayload
        const limit = action.payload.limit as number
        let logData: Array<KCSAPIPayload>
        if (limit > 0) {
            logData = state.logData.slice(0, limit - 1)
            logData.unshift(data)
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
    [ACTION_TRUNCATE_LOG_DATA]: () => getIniitalState(),
}, getIniitalState())
