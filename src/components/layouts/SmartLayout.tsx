import React, { useState } from "react"
import { useSelector } from "react-redux"
import { AppBar, Tabs } from "@material-ui/core"
import { LogbookState } from "../../store"
import { DebugIcon, HomeIcon, SettingsIcon, Tab } from "./Common"
import { Debug } from "../Debug"
import { Dump } from "../Dump"
import { Port } from "../Port"
import { Settings } from "../Settings"

const INDEX_SETTINGS = 5

type SmartLayoutProps = {
    deckNames: string[];
    debugModeEnabled: boolean;
    settingsActivated: boolean;
    setSettingsActive: (_: boolean) => void;
}

type MainPaneProps = {
    index: number;
}

const MainPane: React.SFC<MainPaneProps> = ({ index }) => {
    const port = useSelector((state: LogbookState) => state.port)
    switch (index) {
    case 0:
        return <Port />
    case 1:
    case 2:
    case 3:
    case 4:
        return <Dump data={port.decks[index - 1]} />
    case 5:
        return <Settings />
    case 6:
        return <Debug />
    default:
        return null
    }
}

export const SmartLayout: React.SFC<SmartLayoutProps> = props => {
    const [index, setIndex] = useState(props.settingsActivated ? INDEX_SETTINGS : 0)
    return (
        <div>
            <AppBar position="fixed" color="default">
                <Tabs
                    value={index}
                    onChange={(_, newIndex) => {
                        setIndex(newIndex)
                        props.setSettingsActive(newIndex === INDEX_SETTINGS)
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                >
                    <Tab icon={<HomeIcon />} />
                    <Tab label={props.deckNames[0]} />
                    <Tab label={props.deckNames[1]} />
                    <Tab label={props.deckNames[2]} />
                    <Tab label={props.deckNames[3]} />
                    <Tab icon={<SettingsIcon />} />
                    {props.debugModeEnabled && (
                        <Tab icon={<DebugIcon />} />
                    )}
                </Tabs>
            </AppBar>
            <MainPane index={index} />
        </div>
    )
}
