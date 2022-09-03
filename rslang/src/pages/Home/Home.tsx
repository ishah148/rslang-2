import React from "react"
import { NavLink } from "react-router-dom"

import styles from "./Home.module.scss"
import variables from "../../variables/Variables.module.css"

import backgroundImage from "../../assets/img/main_background.jpg"
import textBookImage from "../../assets/img/mainTextbook.png"
import gamesImage from "../../assets/img/mainGames.png"
import statisticImage from "../../assets/img/mainStatisticpng.png"

function Home() {
  return (
    <>
      <div className={styles.homeBackground}>
        <img src={backgroundImage} alt="background-image"></img>
      </div>
      <div className={styles.homeContainer}>
        <p className={styles.homeTitle}>
          Improve your English level with RsLang
        </p>
        <NavLink to="/games">
          <button className={variables.button}>start learning</button>
        </NavLink>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.mainTitle}>What do we have?</h2>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.capabilitiesContainer}>
          <div className={styles.capabilitie}>
            <NavLink to="/ebook">
              <img
                className={styles.capabilitieImage}
                src={textBookImage}
              ></img>
              <p className={styles.capabilitieTitle}>Electronic textbook</p>
            </NavLink>
            <p className={styles.capabilitieSubTitle}>
              An electronic textbook is a textbook that contains a list of
              words. These words need to be studied. There is also a section
              with difficult words, it consists of words that the user has
              marked as difficult.
            </p>
          </div>
          <div className={styles.capabilitie}>
            <NavLink to="/games">
              <img className={styles.capabilitieImage} src={gamesImage}></img>
              <p className={styles.capabilitieTitle}>Mini games</p>
            </NavLink>
            <p className={styles.capabilitieSubTitle}>
              Mini-games «Audio Challenge» and «Sprint» are games in which you
              can learn words while playing. A very modern approach in which
              there is interest and excitement not to lose.
            </p>
          </div>
          <div className={styles.capabilitie}>
            <NavLink to="/statistics">
              <img
                className={styles.capabilitieImage}
                src={statisticImage}
              ></img>
              <p className={styles.capabilitieTitle}>Statistics page</p>
            </NavLink>
            <p className={styles.capabilitieSubTitle}>
              An electronic textbook is a textbook that contains a list of
              words. These words need to be studied. There is also a section
              with difficult words, it consists of words that the user has
              marked as difficult.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
