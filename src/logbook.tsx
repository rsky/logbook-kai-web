import React from "react"
import ReactDOM from "react-dom"
import { Root } from "./root"

const Logbook: React.SFC = () => {
    return (<Root />)
}

ReactDOM.render(<Logbook />, document.getElementById("root"))
