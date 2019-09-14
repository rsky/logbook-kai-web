import React, { useState } from "react"
import { AppBar, Box, Tabs } from "@material-ui/core"
import { HomeIcon, SettingsIcon, DebugIcon, Tab } from "./Tabs"
import { Settings } from "../Settings"

type SmartLayoutProps = {
    debugMode: boolean;
}

export const SmartLayout: React.SFC<SmartLayoutProps> = props => {
    const [value, setValue] = useState(0)
    return (
        <div>
            <AppBar position="sticky" color="default">
                <Tabs
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
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
                    {props.debugMode && (
                        <Tab icon={<DebugIcon />} />
                    )}
                </Tabs>
            </AppBar>
            <div>
                <Box hidden={value !== 0}>母港</Box>
                <Box hidden={value !== 1}>第1艦隊</Box>
                <Box hidden={value !== 2}>第2艦隊</Box>
                <Box hidden={value !== 3}>第3艦隊</Box>
                <Box hidden={value !== 4}>第4艦隊</Box>
                <Box hidden={value !== 5}>
                    <Settings />
                </Box>
                <Box hidden={value !== 6}>Debug</Box>
            </div>
        </div>
    )
}
