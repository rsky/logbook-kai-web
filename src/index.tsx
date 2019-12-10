import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { setupStore } from "./store"
import { Logbook } from "./components/Logbook"

const store = setupStore()

const App: React.FunctionComponent = () => (
    <Provider store={store}>
        <Logbook />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))
