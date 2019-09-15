import React from "react"
import ReactJson from "react-json-view"
import { Container, makeStyles } from "@material-ui/core"
import { rootStyle } from "./layouts/Common"

const useStyles = makeStyles({
    root: {
        ...rootStyle,
        backgroundColor: "rgb(29, 31, 33)",
    },
})

export const Debug: React.SFC = () => {
    const classes = useStyles()
    const jsonSrc = `
    {
        "name": "logbook-web",
        "version": "1.0.0",
        "description": "The web frontend for logbook-kai"
    }
    `
    return (
        <Container className={classes.root}>
            <ReactJson
                src={JSON.parse(jsonSrc)}
                theme="google"
            />
        </Container>
    )
}
