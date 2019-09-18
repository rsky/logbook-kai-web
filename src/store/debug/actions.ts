import { createAction } from "redux-actions"
import { WebBridgeRecord } from "../../models/KCSAPIStruct"

const ACTION_ADD_LOG_RECORD = "DEBUG_ADD_LOG_RECORDS"
const ACTION_SELECT_LOG_RECORD = "DEBUG_SELECT_LOG_RECORDS"
const ACTION_TRUNCATE_LOG_RECORDS = "DEBUG_TRUNCATE_LOG_RECORDS"

const addLogData = createAction(ACTION_ADD_LOG_RECORD, (record: WebBridgeRecord, limit: number) => ({ record, limit }))
const selectLogData = createAction(ACTION_SELECT_LOG_RECORD, (index: number) => ({ index }))
const truncateLogData = createAction(ACTION_TRUNCATE_LOG_RECORDS, () => ({}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PayloadType = Record<string, any>

export {
    ACTION_ADD_LOG_RECORD as ACTION_ADD_LOG_DATA,
    ACTION_SELECT_LOG_RECORD as ACTION_SELECT_LOG_DATA,
    ACTION_TRUNCATE_LOG_RECORDS as ACTION_TRUNCATE_LOG_DATA,
    PayloadType,
    addLogData,
    selectLogData,
    truncateLogData,
}
