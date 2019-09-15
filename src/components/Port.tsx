import React from "react"
import { useSelector } from "react-redux"
import ReactJson from "react-json-view"
import { Container, makeStyles, Typography } from "@material-ui/core"
import { LogbookState } from "../store"
import { rootStyle } from "./layouts/Common"

const useStyles = makeStyles({
    root: rootStyle,
})

export const Port: React.SFC = () => {
    const classes = useStyles()
    const port = useSelector((state: LogbookState) => state.port)
    return (
        <Container className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
                母港
            </Typography>
            <ReactJson src={port.material} />
        </Container>
    )
}
