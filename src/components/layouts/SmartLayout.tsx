import React, { useState } from "react"
import { AppBar, Box, Tabs, makeStyles } from "@material-ui/core"
import { HomeIcon, SettingsIcon, DebugIcon, Tab, rootStyle } from "./Common"
import { Debug } from "../Debug"
import { Settings } from "../Settings"

const INDEX_SETTINGS = 5

const useStyles = makeStyles({
    root: rootStyle,
})

type SmartLayoutProps = {
    debugModeEnabled: boolean;
    settingsActivated: boolean;
    setSettingsActive: (_: boolean) => void;
}

type MainPaneProps = {
    index: number;
    classes: Record<string, string>;
}

const MainPane: React.SFC<MainPaneProps> = ({ index, classes }) => {
    switch (index) {
    case 0:
        return <Box className={classes.root}>母港</Box>
    case 1:
        return <Box className={classes.root}>第1艦隊</Box>
    case 2:
        return <Box className={classes.root}>第2艦隊</Box>
    case 3:
        return <Box className={classes.root}>第3艦隊</Box>
    case 4:
        return <Box className={classes.root}>第4艦隊</Box>
    case 5:
        return <Settings />
    case 6:
        return <Debug />
    default:
        return null
    }
}

export const SmartLayout: React.SFC<SmartLayoutProps> = props => {
    const classes = useStyles()
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
            <MainPane index={index} classes={classes} />
        </div>
    )
}
