import React, { useState } from "react"
import { AppBar, Box, Grid, Tabs } from "@material-ui/core"
import { HomeIcon, SettingsIcon, DebugIcon, Tab } from "./Tabs"
import { Settings } from "../Settings"

type WideLayoutProps = {
    debugMode: boolean;
}

export const WideLayout: React.SFC<WideLayoutProps> = props => {
    const [lValue, setLValue] = useState(0)
    const [rValue, setRValue] = useState(0)
    return (
        <div>
            <AppBar position="sticky" color="default">
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Tabs
                            value={lValue}
                            onChange={(_, newValue) => setLValue(newValue)}
                            variant="fullWidth"
                            indicatorColor="primary"
                        >
                            <Tab icon={<HomeIcon />} />
                            <Tab icon={<SettingsIcon />} />
                            {props.debugMode && (
                                <Tab icon={<DebugIcon />} />
                            )}
                        </Tabs>
                    </Grid>
                    <Grid item xs={6}>
                        <Tabs
                            value={rValue}
                            onChange={(_, newValue) => setRValue(newValue)}
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
                    <Box hidden={lValue !== 0}>母港</Box>
                    <Box hidden={lValue !== 1}>
                        <Settings />
                    </Box>
                    <Box hidden={lValue !== 2}>Debug</Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box hidden={rValue !== 0}>第1艦隊</Box>
                    <Box hidden={rValue !== 1}>第2艦隊</Box>
                    <Box hidden={rValue !== 2}>第3艦隊</Box>
                    <Box hidden={rValue !== 3}>第4艦隊</Box>
                </Grid>
            </Grid>
        </div>
    )
}
