import React from "react"
import { Container, Typography, makeStyles } from "@material-ui/core"
import { rootStyle } from "./layouts/Common"

const useStyles = makeStyles({
    root: rootStyle,
})

export const Port: React.SFC = () => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
                母港
            </Typography>
        </Container>
    )
}
