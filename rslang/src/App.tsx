import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"

//styles
import "./App.css"
import "./styles/App.scss"

//components
import Games from "./pages/Games"
import Home from "./pages/Home/Home"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import Signin from "./pages/Signin"

// import Ebook from "./pages/Ebook/Ebook"

// import Stats from "./pages/Statistics"

import NavBar from "./components/NavBar"
import { AuthApi, generateRandStr, UserApi, WordsApi } from "./services/api"
import { newWordTest, testUser, testUserErr } from "./services/api_types"
//redux
import { useTypedSelector } from "./hooks/useTypedSelector"
import { IUser, UserActionTypes } from "./redux/action-types/user"
import { useDispatch } from "react-redux"
import Footer from "./components/Footer"
import Result from "./games/Audiocall/Result"
import Audiocall from "./games/Audiocall"
import Sprint from "./games/Sprint"

import Round from "./games/Sprint/Round/Round"

// import Round from "./games/Sprint/Round"
import Stats from "./pages/Statistics"
import Ebook from "./pages/Ebook/Ebook"
import { useUserWordsActionsCreators } from "./hooks/useActions"

function App() {
  const { user } = useTypedSelector((state) => state.user)
  const { getUserWords } = useUserWordsActionsCreators()
  const dispatch = useDispatch()
  useEffect(() => {
    const jsonUser: string | null = localStorage.getItem("user")

    if (typeof jsonUser === "string") {
      const localUser: IUser = JSON.parse(jsonUser)
      dispatch({ type: UserActionTypes.SIGNIN, payload: localUser })
    }
  }, [])
  React.useLayoutEffect(() => {
    if (user) {
      getUserWords()
    }
  }, [user])
  return (
    <>
      <div className="container">
        <NavBar />
        <Routes >
          <Route path="/rslang-2/" element={<Home />} />
          <Route path="/rslang-2/games" element={<Games />} />
          <Route path="/rslang-2/games/audiocall" element={<Audiocall />} />
          <Route path="/rslang-2/games/audiocall/result" element={<Result />} />
          <Route path="/rslang-2/games/sprint" element={<Sprint />} />
          <Route path="/rslang-2/games/sprint/round" element={<Round />} />
          <Route path="/rslang-2/signup" element={<Signup />} />
          <Route path="/rslang-2/signin" element={<Signin />} />
          <Route path="/rslang-2/ebook" element={<Ebook />} />
          <Route path="/rslang-2/statistics" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
