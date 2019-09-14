import React from "react"
import { useSelector } from "react-redux"
import { LogbookState } from "../store"
import { UIMode } from "../models/UIMode"
import { SmartLayout } from "./layouts/SmartLayout"
import { WideLayout } from "./layouts/WideLayout"

export const Logbook: React.SFC = () => {
    const settings = useSelector((state: LogbookState) => state.settings)
    if (settings.uiMode === UIMode.WIDE) {
        return <WideLayout debugMode={settings.debugMode} />
    } else {
        return <SmartLayout debugMode={settings.debugMode} />
    }
}
