import React, { useState } from "react"
import { AppBar, Box, Tab, Tabs, withStyles } from "@material-ui/core"
import Icon from "@mdi/react"
import { mdiAnchor, mdiBug, mdiSettings } from "@mdi/js"

const HomeIcon: React.SFC = () => (
    <Icon
        path={mdiAnchor}
        title="母港"
        size={1}
    />
)

const SettingsIcon: React.SFC = () => (
    <Icon
        path={mdiSettings}
        title="設定"
        size={1}
    />
)

const DebugIcon: React.SFC = () => (
    <Icon
        path={mdiBug}
        title="Debug"
        size={1}
    />
)

const StyledTab = withStyles({
    root: {
        textTransform: "none",
    },
})(Tab)

export const App: React.SFC = () => {
    const [value, setValue] = useState(0)
    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                >
                    <StyledTab icon={<HomeIcon />} />
                    <StyledTab label="第1艦隊" />
                    <StyledTab label="第2艦隊" />
                    <StyledTab label="第3艦隊" />
                    <StyledTab label="第4艦隊" />
                    <StyledTab icon={<SettingsIcon />} />
                    <StyledTab icon={<DebugIcon />} />
                </Tabs>
            </AppBar>
            <div>
                <Box hidden={value !== 0}>母港</Box>
                <Box hidden={value !== 1}>第1艦隊</Box>
                <Box hidden={value !== 2}>第2艦隊</Box>
                <Box hidden={value !== 3}>第3艦隊</Box>
                <Box hidden={value !== 4}>第4艦隊</Box>
                <Box hidden={value !== 5}>設定</Box>
                <Box hidden={value !== 6}>Debug</Box>
            </div>
        </div>
    )
}
