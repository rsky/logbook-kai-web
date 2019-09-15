import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LogbookState } from "../store"
import { connect } from "../store/websocket/actions"
import { UIMode } from "../models/UIMode"
import { SmartLayout } from "./layouts/SmartLayout"
import { WideLayout } from "./layouts/WideLayout"

export const Logbook: React.SFC = () => {
    const settings = useSelector((state: LogbookState) => state.settings)
    const [settingsActivated, setSettingsActive] = useState(false)
    const layoutProps = {
        debugModeEnabled: settings.debugMode,
        settingsActivated,
        setSettingsActive,
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(connect())
    }, [])

    if (settings.uiMode === UIMode.WIDE) {
        return <WideLayout {...layoutProps} />
    } else {
        return <SmartLayout {...layoutProps} />
    }
}
