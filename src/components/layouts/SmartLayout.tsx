import React, { useState } from "react"
import { AppBar, Tabs } from "@material-ui/core"
import { HomeIcon, SettingsIcon, DebugIcon, Tab } from "./Common"
import { Debug } from "../Debug"
import { Dump } from "../Dump"
import { Port } from "../Port"
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

const MainPane: React.SFC<MainPaneProps> = ({ index }) => {
    switch (index) {
    case 0:
        return <Port />
    case 1:
        return <Dump data={{ name: "第1艦隊" }} />
    case 2:
        return <Dump data={{ name: "第2艦隊" }} />
    case 3:
        return <Dump data={{ name: "第3艦隊" }} />
    case 4:
        return <Dump data={{ name: "第4艦隊" }} />
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
