import React, { useState } from "react"
import { useSelector } from "react-redux"
import { AppBar, Grid, Tabs } from "@material-ui/core"
import { LogbookState } from "../../store"
import { DebugIcon, HomeIcon, SettingsIcon, Tab } from "./Common"
import { Debug } from "../Debug"
import { Dump } from "../Dump"
import { Port } from "../Port"
import { Settings } from "../Settings"

const INDEX_SETTINGS = 1

type WideLayoutProps = {
    deckNames: Array<string>;
    debugModeEnabled: boolean;
    settingsActivated: boolean;
    setSettingsActive: (_: boolean) => void;
}

type LeftPaneProps = {
    index: number;
}

type RightPaneProps = {
    index: number;
}

const LeftPane: React.SFC<LeftPaneProps> = ({ index }) => {
    switch (index) {
    case 0:
        return <Port />
    case 1:
        return <Settings />
    case 2:
        return <Debug />
    default:
        return null
    }
}

const RightPane: React.SFC<RightPaneProps> = ({ index }) => {
    const port = useSelector((state: LogbookState) => state.port)
    return <Dump data={port.decks[index]} />
}

export const WideLayout: React.SFC<WideLayoutProps> = props => {
    const [lIndex, setLIndex] = useState(props.settingsActivated ? INDEX_SETTINGS : 0)
    const [rIndex, setRIndex] = useState(0)
    return (
        <div>
            <AppBar position="fixed" color="default">
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Tabs
                            value={lIndex}
                            onChange={(_, newLIndex) => {
                                setLIndex(newLIndex)
                                props.setSettingsActive(newLIndex === INDEX_SETTINGS)
                            }}
                            variant="fullWidth"
                            indicatorColor="primary"
                        >
                            <Tab icon={<HomeIcon />} />
                            <Tab icon={<SettingsIcon />} />
                            {props.debugModeEnabled && (
                                <Tab icon={<DebugIcon />} />
                            )}
                        </Tabs>
                    </Grid>
                    <Grid item xs={6}>
                        <Tabs
                            value={rIndex}
                            onChange={(_, newRIndex) => setRIndex(newRIndex)}
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="primary"
                        >
                            <Tab label={props.deckNames[0]} />
                            <Tab label={props.deckNames[1]} />
                            <Tab label={props.deckNames[2]} />
                            <Tab label={props.deckNames[3]} />
                        </Tabs>
                    </Grid>
                </Grid>
            </AppBar>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                    <LeftPane index={lIndex} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RightPane index={rIndex} />
                </Grid>
            </Grid>
        </div>
    )
}
