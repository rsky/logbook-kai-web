import React from "react"
import ReactJson from "react-json-view"
import { Container, makeStyles } from "@material-ui/core"
import { rootStyle } from "./layouts/Common"

const useStyles = makeStyles({
    root: rootStyle,
})

type JSONDumpProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}

export const Dump: React.SFC<JSONDumpProps> = ({ data }) => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <ReactJson src={data} />
        </Container>
    )
}
