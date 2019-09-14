import { createAction } from "redux-actions"

const ACTION_SET_UI_MODE = "SETTINGS_SET_UI_MODE"
const ACTION_SET_DEBUG_MODE = "SETTINGS_SET_DEBUG_MODE"
const ACTION_SET_MAX_LOG_RECORDS = "SETTINGS_SET_MAX_LOG_RECORDS"

const setUIMode = createAction(ACTION_SET_UI_MODE, (mode: string) => ({ mode }))
const setDebugMode = createAction(ACTION_SET_DEBUG_MODE, (debug: boolean) => ({ debug }))
const setMaxLogRecords = createAction(ACTION_SET_MAX_LOG_RECORDS, (value: string) => ({ value }))

type PayloadType = Record<string, string | boolean>

export {
    ACTION_SET_DEBUG_MODE,
    ACTION_SET_MAX_LOG_RECORDS,
    ACTION_SET_UI_MODE,
    PayloadType,
    setDebugMode,
    setMaxLogRecords,
    setUIMode,
}
