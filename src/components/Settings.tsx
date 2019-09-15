import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Card,
    CardContent,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core"
import { rootStyle } from "./layouts/Common"
import { UIMode } from "../models/UIMode"
import { LogbookState } from "../store"
import { setDebugMode, setMaxLogRecords, setUIMode } from "../store/settings/actions"

const useStyles = makeStyles({
    root: rootStyle,
    card: {
        marginTop: "16px",
    },
    formControl: {
        display: "block",
        marginTop: "16px",
    },
    fromLabel: {
        marginBottom: "8px",
    },
})

export const Settings: React.SFC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const settings = useSelector((state: LogbookState) => state.settings)
    return (
        <Container className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
                設定
            </Typography>

            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                        全般
                    </Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className={classes.fromLabel}>UIモード</FormLabel>
                        <RadioGroup
                            value={settings.uiMode}
                            onChange={event => dispatch(setUIMode(event.target.value))}
                            row
                        >
                            <FormControlLabel
                                value={UIMode.SMART}
                                control={<Radio color="primary" />}
                                label="スマート"
                            />
                            <FormControlLabel
                                value={UIMode.WIDE}
                                control={<Radio color="primary" />}
                                label="ワイド"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className={classes.fromLabel}>デバッグモード</FormLabel>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={settings.debugMode}
                                    onChange={event => dispatch(setDebugMode(event.target.checked))}
                                    color="primary"
                                />
                            }
                            label="デバッグモードを有効にする"
                        />
                        <br />
                        <TextField
                            label="APIログ記憶件数"
                            type="number"
                            defaultValue={settings.maxLogRecords}
                            onChange={event => dispatch(setMaxLogRecords(event.target.value))}
                        />
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    )
}
