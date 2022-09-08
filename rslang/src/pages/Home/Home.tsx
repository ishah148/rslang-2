import React from "react"
import { NavLink } from "react-router-dom"

import styles from "./Home.module.scss"
import variables from "../../variables/Variables.module.css"

import backgroundImage from "../../assets/img/main_background.jpg"
import textBookImage from "../../assets/img/mainTextbook.png"
import gamesImage from "../../assets/img/mainGames.png"
import statisticImage from "../../assets/img/mainStatisticpng.png"

import shah from "../../assets/img/shah.png"
import nikolay from "../../assets/img/nikolay.png"
import kirill from "../../assets/img/kirill.png"

function Home() {
  return (
    <>
      <div className={styles.homeBackground}>
        <img src={backgroundImage} alt="background-image"></img>
      </div>
      <div className={styles.homeContainer}>
        <p className={styles.homeTitle}>Improve your English level with RsLang</p>
        <div className="alert">
          <p>Оставьте пожалуйста контакты после проверки :)</p>
          <p>! Для корректной работы статистики необходимо создать новый аккаунт !</p>
          <p>В случае вопросов по функционалу контакты для связи : </p>
          <p>@IgorTg123</p>
          <p>@theroofisonfire</p>
          <p>Discord:</p>
          <p>IgorShah(ishah148)#3091</p>
          <p>theroofisonfire#1523</p>
        </div>
        <NavLink to="/rslang-2/games">
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
            <NavLink to="/rslang-2/ebook">
              <img className={styles.capabilitieImage} src={textBookImage}></img>
              <p className={styles.capabilitieTitle}>Electronic textbook</p>
            </NavLink>
            <p className={styles.capabilitieSubTitle}>
              An electronic textbook is a textbook that contains a list of words. These words need to be studied. There
              is also a section with difficult words, it consists of words that the user has marked as difficult.
            </p>
          </div>
          <div className={styles.capabilitie}>
            <NavLink to="/rslang-2/games">
              <img className={styles.capabilitieImage} src={gamesImage}></img>
              <p className={styles.capabilitieTitle}>Mini games</p>
            </NavLink>
            <p className={styles.capabilitieSubTitle}>
              Mini-games «Audio Challenge» and «Sprint» are games in which you can learn words while playing. A very
              modern approach in which there is interest and excitement not to lose.
            </p>
          </div>
          <div className={styles.capabilitie}>
            <NavLink to="/rslang-2/statistics">
              <img className={styles.capabilitieImage} src={statisticImage}></img>
              <p className={styles.capabilitieTitle}>Statistics page</p>
            </NavLink>
            <p className={styles.capabilitieSubTitle}>
              An electronic textbook is a textbook that contains a list of words. These words need to be studied. There
              is also a section with difficult words, it consists of words that the user has marked as difficult.
            </p>
          </div>
        </div>

        <div className={styles.titleContainer}>
          <h2 className={styles.mainTitle}>The project was made by</h2>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.aboutTeam}>
          <a
            href="https://github.com/ishah148"
            target="_blank"
            className={styles.card + " " + styles.shah}
            rel="noreferrer"
          >
            <div className={styles.body}>
              <div className={styles.image}>
                <img src={shah} />
              </div>
              <h2>CallBack master</h2>
              <h3>Координирование работы команды, настройка конфигов проекта, redux,игры </h3>
            </div>

            <div className={styles.epmty}></div>
          </a>

          <a
            href="https://github.com/NikolayKovzik"
            target="_blank"
            className={styles.card + " " + styles.shah}
            rel="noreferrer"
          >
            <div className={styles.body}>
              <div className={styles.image}>
                <img src={nikolay} />
              </div>
              <h2>Архитектор</h2>
              <h3>GitHub, логика взаимодействия клиент-сервер,статистика, разработчик конфликтов</h3>
            </div>

            <div className={styles.epmty}></div>
          </a>

          <a
            href="https://github.com/DarkCrew"
            target="_blank"
            className={styles.card + " " + styles.shah}
            rel="noreferrer"
          >
            <div className={styles.body}>
              <div className={styles.image}>
                <img src={kirill} />
              </div>
              <h2>Design master</h2>
              <h3>Дизайн проета, авторизация, home page</h3>
            </div>

            <div className={styles.epmty}></div>
          </a>
        </div>
      </div>
    </>
  )
}
export default Home
