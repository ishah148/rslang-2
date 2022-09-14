import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
//components
import App from "./App"

// redux
import { Provider } from "react-redux"
import store from "./redux/store"

//styles
import "./index.css"


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
