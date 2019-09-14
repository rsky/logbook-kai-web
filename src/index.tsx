// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { configureStore } from "./store"
import { Logbook } from "./components/Logbook"

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Logbook />
    </Provider>,
    document.getElementById("root"),
)
