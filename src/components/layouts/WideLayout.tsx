import React, { useState } from "react"
import { AppBar, Grid, Tabs } from "@material-ui/core"
import { DebugIcon, HomeIcon, SettingsIcon, Tab } from "./Common"
import { Debug } from "../Debug"
import { Dump } from "../Dump"
import { Port } from "../Port"
import { Settings } from "../Settings"

const INDEX_SETTINGS = 1

type WideLayoutProps = {
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
    switch (index) {
    case 0:
        return <Dump data={{ name: "第1艦隊" }} />
    case 1:
        return <Dump data={{ name: "第1艦隊" }} />
    case 2:
        return <Dump data={{ name: "第1艦隊" }} />
    case 3:
        return <Dump data={{ name: "第1艦隊" }} />
    default:
        return null
    }
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
                            <Tab label="第1艦隊" />
                            <Tab label="第2艦隊" />
                            <Tab label="第3艦隊" />
                            <Tab label="第4艦隊" />
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
