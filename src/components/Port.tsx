import React from "react"
import ReactJson from "react-json-view"
import { useSelector } from "react-redux"
import { Container, makeStyles, Typography } from "@material-ui/core"

import { LogbookState } from "../store"

import { rootStyle } from "./layouts/Common"
import { MaterialIcon } from "./widgets/MaterialIcon"

const useStyles = makeStyles({
    root: rootStyle,
})

export const Port: React.SFC = () => {
    const classes = useStyles()
    const port = useSelector((state: LogbookState) => state.port)
    const settings = useSelector((state: LogbookState) => state.settings)
    return (
        <Container className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
                母港
            </Typography>
            <MaterialIcon material={port.materials.fuel} />
            <MaterialIcon material={port.materials.ammunition} />
            <MaterialIcon material={port.materials.steel} />
            <MaterialIcon material={port.materials.bauxite} />
            <MaterialIcon material={port.materials.bucket} />
            <MaterialIcon material={port.materials.burner} />
            <MaterialIcon material={port.materials.nail} />
            <MaterialIcon material={port.materials.screw} />
            {settings.debugMode && <ReactJson src={port} collapsed style={{ marginTop: "16px" }} />}
        </Container>
    )
}
