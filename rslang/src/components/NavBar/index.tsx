import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useActions, useUserWordsActionsCreators } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import logo from "../../assets/img/logoRslang.png"
import styles from "./NavBar.module.scss"

function NavBar() {
  const { user } = useTypedSelector((state) => state.user)
  const { logOut } = useActions()
  const { resetUserWords } = useUserWordsActionsCreators()
  const location = useLocation()

  const handleClick = () => {
    logOut()
    localStorage.clear()
    resetUserWords()
  }

  return (
    <>
      <div className={location.pathname === "/ebook" ? styles.mainNavActive : styles.mainNav}>
        <div className={styles.mainNavContainer}>
          <NavLink to="/">
            <div className={styles.logoContainer}>
              <img src={logo} alt="logo"></img>
            </div>
          </NavLink>
          <nav>
            <ul className={styles.mainNavLinks}>
              <li>
                <NavLink to="/games">Games</NavLink>
              </li>
              <li>
                <NavLink to="/ebook">Ebook</NavLink>
              </li>
              <li>
                <NavLink to="/statistics">Stats</NavLink>
              </li>
              {user?.message === "Authenticated" ? (
                <li>
                  <p>{user.name}</p>
                  <p>{user.message}</p>
                  <button onClick={() => handleClick()}>Logout</button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signin">Signin</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
export default NavBar
