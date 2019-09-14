import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { configureStore } from "./store"
import { Logbook } from "./components/Logbook"

const store = configureStore()

const App: React.SFC = () => (
    <Provider store={store}>
        <Logbook />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))
