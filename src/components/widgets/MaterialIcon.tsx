import React from "react"
import { makeStyles } from "@material-ui/core"

import { Material } from "../../models/Material"
import { numberFormatter as nf } from "../../utils/format"
import { getMaterialIconURI } from "../../utils/resource"

const useStyles = makeStyles({
    root: {
        position: "relative",
        display: "inline-block",
    },
    icon: {
    },
    amount: {
        position: "absolute",
        right: "6px",
        bottom: "8px",
        color: "white",
        textShadow: "2px 2px 1px black",
        fontSize: "14px",
        fontWeight: "bold",
    },
})

type MaterialIconProps = {
    material: Material;
}

export const MaterialIcon: React.SFC<MaterialIconProps> = ({ material }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img className={classes.icon} src={getMaterialIconURI(material.id)} />
            <span className={classes.amount}>{nf.format(material.amount)}</span>
        </div>
    )
}
