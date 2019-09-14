import React from "react"
import { Tab, withStyles } from "@material-ui/core"
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

export {
    HomeIcon,
    SettingsIcon,
    DebugIcon,
    StyledTab as Tab,
}
