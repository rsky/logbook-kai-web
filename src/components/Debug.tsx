import React from "react"
import ReactJson from "react-json-view"
import { Container, makeStyles, MenuItem, Select } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { KCSAPIPayload } from "../models/KCSAPIPayload"
import { selectLogData } from "../store/debug/actions"
import { LogbookState } from "../store"
import { rootStyle } from "./layouts/Common"

const useStyles = makeStyles({
    root: {
        ...rootStyle,
        backgroundColor: "rgb(29, 31, 33)",
    },
    head: {
        margin: "-16px -16px 16px -16px",
        padding: "16px",
        backgroundColor: "white",
    },
})

const nullData: KCSAPIPayload = {
    requestURI: "",
    responseJSON: null,
}

export const Debug: React.SFC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const debugState = useSelector((state: LogbookState) => state.debug)
    const selectedIndex = debugState.logData.indexOf(debugState.selectedData || nullData) + 1
    return (
        <Container className={classes.root}>
            <div className={classes.head}>
                <Select
                    value={selectedIndex}
                    onChange={event => dispatch(selectLogData(event.target.value as number - 1))}
                    fullWidth
                    variant="filled"
                >
                    <MenuItem value={0}>-</MenuItem>
                    {debugState.logData.map((value, index) => (
                        <MenuItem key={index} value={index + 1}>{value.requestURI}</MenuItem>
                    ))}
                </Select>
            </div>
            {debugState.selectedData && (
                <ReactJson
                    src={debugState.selectedData.responseJSON}
                    theme="google"
                />
            )}
        </Container>
    )
}
