import { handleActions } from "redux-actions"

import { WebBridgeRecord } from "../../models/KCSAPIStruct"

import { ACTION_ADD_LOG_DATA, ACTION_SELECT_LOG_DATA, ACTION_TRUNCATE_LOG_DATA, PayloadType } from "./actions"

export type DebugState = {
    selectedRecord?: WebBridgeRecord;
    apiLogRecords: Array<WebBridgeRecord>;
}

const getInitialState = (): DebugState => ({
    selectedRecord: undefined,
    apiLogRecords: [],
})

export const debugReducer = handleActions<DebugState, PayloadType>({
    [ACTION_ADD_LOG_DATA]: (state, action) => {
        const record = action.payload.record as WebBridgeRecord
        const limit = action.payload.limit as number
        let records: WebBridgeRecord[]
        if (limit > 0) {
            records = [record, ...state.apiLogRecords.slice(0, limit - 1)]
        } else if (limit < 0) {
            records = [record, ...state.apiLogRecords]
        } else {
            records = []
        }
        return { ...state, apiLogRecords: records }
    },
    [ACTION_SELECT_LOG_DATA]: (state, action) => {
        const index = action.payload.index as number
        const record = state.apiLogRecords[index]
        return { ...state, selectedRecord: record }
    },
    [ACTION_TRUNCATE_LOG_DATA]: () => getInitialState(),
}, getInitialState())
