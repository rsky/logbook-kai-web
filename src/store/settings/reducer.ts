import { handleActions } from "redux-actions"
import { UIMode } from "../../models/UIMode"
import { getStorage } from "../../utils/storage"
import { ACTION_SET_DEBUG_MODE, ACTION_SET_MAX_LOG_RECORDS, ACTION_SET_UI_MODE, PayloadType } from "./actions"

const SETTINGS_DEBUG_MODE_KEY = "logbook.settings.debugMode"
const SETTINGS_MAX_LOG_RECORDS_KEY = "logbook.settings.maxLogRecords"
const SETTINGS_UI_MODE_KEY = "logbook.settings.uiMode"

export type SettingsState = {
    uiMode: string;
    debugMode: boolean;
    maxLogRecords: number;
}

const defaultSettings = {
    uiMode: UIMode.SMART,
    maxLogRecords: 10,
}

const getInitialState = (): SettingsState => {
    const state = {} as SettingsState
    const storage = getStorage()

    state.debugMode = !!storage.getItem(SETTINGS_DEBUG_MODE_KEY)

    const maxLogRecords = storage.getItem(SETTINGS_MAX_LOG_RECORDS_KEY)
    if (maxLogRecords) {
        state.maxLogRecords = parseInt(maxLogRecords, 10)
    } else {
        state.maxLogRecords = defaultSettings.maxLogRecords
    }

    const uiMode = storage.getItem(SETTINGS_UI_MODE_KEY)
    if (uiMode && (Object.values(UIMode) as string[]).includes(uiMode)) {
        state.uiMode = uiMode
    } else {
        state.uiMode = defaultSettings.uiMode
    }

    return state
}

export const settingsReducer = handleActions<SettingsState, PayloadType>({
    [ACTION_SET_DEBUG_MODE]: (state, action) => {
        let debugMode: boolean
        if (action.payload.debug) {
            getStorage().setItem(SETTINGS_DEBUG_MODE_KEY, "1")
            debugMode = true
        } else {
            getStorage().removeItem(SETTINGS_DEBUG_MODE_KEY)
            debugMode = false
        }
        return { ...state, debugMode }
    },
    [ACTION_SET_MAX_LOG_RECORDS]: (state, action) => {
        const value = action.payload.value.toString()
        let maxLogRecords
        if (value) {
            maxLogRecords = parseInt(value, 10)
            getStorage().setItem(SETTINGS_MAX_LOG_RECORDS_KEY, value)
        } else {
            getStorage().removeItem(SETTINGS_MAX_LOG_RECORDS_KEY)
            maxLogRecords = defaultSettings.maxLogRecords
        }
        return { ...state, maxLogRecords }
    },
    [ACTION_SET_UI_MODE]: (state, action) => {
        const uiMode = action.payload.mode.toString()
        getStorage().setItem(SETTINGS_UI_MODE_KEY, uiMode)
        return { ...state, uiMode }
    },
}, getInitialState())
