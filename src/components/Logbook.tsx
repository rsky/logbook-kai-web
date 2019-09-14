import React, { useState } from "react"
import { useSelector } from "react-redux"
import { LogbookState } from "../store"
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
    if (settings.uiMode === UIMode.WIDE) {
        return <WideLayout {...layoutProps} />
    } else {
        return <SmartLayout {...layoutProps} />
    }
}
