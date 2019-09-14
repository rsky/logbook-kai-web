import React, { useState } from "react"
import { AppBar, Box, Tabs } from "@material-ui/core"
import { HomeIcon, SettingsIcon, DebugIcon, Tab } from "./Tabs"
import { Debug } from "../Debug"
import { Settings } from "../Settings"

const INDEX_SETTINGS = 5

type SmartLayoutProps = {
    debugModeEnabled: boolean;
    settingsActivated: boolean;
    setSettingsActive: (_: boolean) => void;
}

type MainPaneProps = {
    index: number;
}

const MainPane: React.SFC<MainPaneProps> = props => {
    switch (props.index) {
    case 0:
        return <Box>母港</Box>
    case 1:
        return <Box>第1艦隊</Box>
    case 2:
        return <Box>第2艦隊</Box>
    case 3:
        return <Box>第3艦隊</Box>
    case 4:
        return <Box>第4艦隊</Box>
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
            <AppBar position="sticky" color="default">
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
                    <Tab label="第1艦隊" />
                    <Tab label="第2艦隊" />
                    <Tab label="第3艦隊" />
                    <Tab label="第4艦隊" />
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
