import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LogbookState } from "../store"
import { connect } from "../store/websocket/actions"
import { UIMode } from "../models/UIMode"
import { SmartLayout } from "./layouts/SmartLayout"
import { WideLayout } from "./layouts/WideLayout"

export const Logbook: React.SFC = () => {
    const [settingsActivated, setSettingsActive] = useState(false)
    const settings = useSelector((state: LogbookState) => state.settings)
    const port = useSelector((state: LogbookState) => state.port)
    const dispatch = useDispatch()

    const deckNames = ["第1艦隊", "第2艦隊", "第3艦隊", "第4艦隊"]
    port.decks.forEach((deck, index) => (deckNames[index] = deck.name))
    const layoutProps = {
        debugModeEnabled: settings.debugMode,
        settingsActivated,
        setSettingsActive,
        deckNames,
    }

    useEffect(() => {
        dispatch(connect())
    }, [])

    if (settings.uiMode === UIMode.WIDE) {
        return <WideLayout {...layoutProps} />
    } else {
        return <SmartLayout {...layoutProps} />
    }
}
