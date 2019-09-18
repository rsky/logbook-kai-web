import React from "react"
import ReactJson from "react-json-view"
import fecha from "fecha"
import { Container, makeStyles, MenuItem, Select } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { WebBridgeRecord } from "../models/KCSAPIStruct"
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

const nullRecord = new WebBridgeRecord("", 0, {})

export const Debug: React.SFC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const debugState = useSelector((state: LogbookState) => state.debug)
    const selectedIndex = debugState.apiLogRecords.indexOf(debugState.selectedRecord || nullRecord) + 1
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
                    {debugState.apiLogRecords.map((record, index) => {
                        const date = fecha.format(record.date, "YYYY-MM-DD HH:mm:ss.SSS")
                        return <MenuItem key={record.key} value={index + 1}>{date} {record.uri}</MenuItem>
                    })}
                </Select>
            </div>
            {debugState.selectedRecord && (
                <ReactJson
                    src={debugState.selectedRecord.body}
                    theme="google"
                />
            )}
        </Container>
    )
}
