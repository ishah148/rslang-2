import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { GamesService } from "./services/games_services"
//components
import App from "./App"

// redux
import { Provider } from "react-redux"
import store from "./redux/store"

//styles
import "./index.css"

async function test() {
  const res = await GamesService.calcNewWords(['5e9f5ee35eb9e72bc21af715', '5e9f5ee35eb9e72bc21af71c', '5e9f5ee35eb9e72bc21af720', '5e9f5ee35eb9e72bc21af71e', '5e9f5ee35eb9e72bc21af71d']);
  return res;
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
)
