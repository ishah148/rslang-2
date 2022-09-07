import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
//components
import App from "./App"

// redux
import { Provider } from "react-redux"
import store from "./redux/store"

//styles
import "./index.css"


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
)
