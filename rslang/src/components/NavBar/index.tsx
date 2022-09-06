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
      <div className={location.pathname === "/rslang-2/ebook" ? styles.mainNavActive : styles.mainNav}>
        <div className={styles.mainNavContainer}>
          <NavLink to="/rslang-2/">
            <div className={styles.logoContainer}>
              <img src={logo} alt="logo"></img>
            </div>
          </NavLink>
          <nav>
            <ul className={styles.mainNavLinks}>
              <li>
                <NavLink to="/rslang-2/games">Games</NavLink>
              </li>
              <li>
                <NavLink to="/rslang-2/ebook">Ebook</NavLink>
              </li>
              <li>
                <NavLink to="/rslang-2/statistics">Stats</NavLink>
              </li>
              {user?.message === "Authenticated" ? (
                <li
                  style={{
                    background: "#00aeff",
                    padding: "0 10px",
                  }}
                >
                  <p>{user.name}</p>
                  <p>{user.message}</p>
                  <button onClick={() => handleClick()}>Logout</button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/rslang-2/signup">Signup</NavLink>
                  </li>
                  <li>
                    <NavLink to="/rslang-2/signin">Signin</NavLink>
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
