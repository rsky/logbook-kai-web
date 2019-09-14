import React from "react"
import { Tab, withStyles } from "@material-ui/core"
import { CSSProperties } from "@material-ui/core/styles/withStyles"
import Icon from "@mdi/react"
import { mdiAnchor, mdiBug, mdiSettings } from "@mdi/js"

const rootStyle: CSSProperties = {
    height: "calc(100vh - 48px)",
    margin: "48px 0 0 0",
    padding: "16px",
    boxSizing: "border-box",
    overflow: "auto",
}

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

export {
    HomeIcon,
    SettingsIcon,
    DebugIcon,
    StyledTab as Tab,
    rootStyle,
}
