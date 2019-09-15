import { createAction } from "redux-actions"
import { KCSAPIPayload } from "../../models/KCSAPIPayload"

const ACTION_ADD_LOG_DATA = "DEBUG_PUSH_LOG_DATA"
const ACTION_SELECT_LOG_DATA = "DEBUG_SET_LOG_DATA"
const ACTION_TRUNCATE_LOG_DATA = "DEBUG_TRUNCATE_LOG_DATA"

const addLogData = createAction(ACTION_ADD_LOG_DATA, (data: KCSAPIPayload, limit: number) => ({ data, limit }))
const selectLogData = createAction(ACTION_SELECT_LOG_DATA, (index: number) => ({ index }))
const truncateLogData = createAction(ACTION_TRUNCATE_LOG_DATA, () => ({}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PayloadType = Record<string, any>

export {
    ACTION_ADD_LOG_DATA,
    ACTION_SELECT_LOG_DATA,
    ACTION_TRUNCATE_LOG_DATA,
    PayloadType,
    addLogData,
    selectLogData,
    truncateLogData,
}
