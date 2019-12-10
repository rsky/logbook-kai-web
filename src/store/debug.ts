import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WebBridgeRecord } from "../models/KCSAPIStruct"

export type DebugState = {
    selectedRecord?: WebBridgeRecord;
    apiLogRecords: Array<WebBridgeRecord>;
}

const getInitialState = (): DebugState => ({
    selectedRecord: undefined,
    apiLogRecords: [],
})

const debugSlice = createSlice({
    name: "debug",
    initialState: getInitialState(),
    reducers: {
        addLogData: (state, action: PayloadAction<{record: WebBridgeRecord; limit: number}>) => {
            const { record, limit } = action.payload
            if (limit > 0) {
                state.apiLogRecords = [record, ...state.apiLogRecords.slice(0, limit - 1)]
            } else if (limit < 0) {
                state.apiLogRecords = [record, ...state.apiLogRecords]
            } else {
                state.apiLogRecords = []
            }
        },
        selectLogData: (state, action: PayloadAction<number>) => {
            state.selectedRecord = state.apiLogRecords[action.payload]
        },
        truncateLogData: () => getInitialState(),
    },
})

export const debugReducer = debugSlice.reducer
export const {
    addLogData,
    selectLogData,
    truncateLogData,
} = debugSlice.actions
