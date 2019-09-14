import React from "react"
import ReactJson from "react-json-view"

export const Debug: React.SFC = () => {
    const jsonSrc = `
    {
        "name": "logbook-web",
        "version": "1.0.0",
        "description": "The web frontend for logbook-kai"
    }
    `
    return <ReactJson src={JSON.parse(jsonSrc)} />
}
