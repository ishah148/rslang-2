import React from "react"
import styles from "./Footer.module.scss"
import githubImage from "../../assets/img/github.png"
import rssImage from "../../assets/img/rs-school.png"

function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLinkElements}>
            <p className={styles.footerInfo}>Created in 2022</p>
            <div className={styles.footerGitsContainer}>
              <a
                href="https://github.com/DarkCrew"
                target="_blank"
                rel="noreferrer"
                className={styles.footerGitContainer}
              >
                <img
                  src={githubImage}
                  alt="github"
                  className={styles.footerGit}
                ></img>
                <p className={styles.footerGitName}>DarkCrew</p>
              </a>
              <a
                href="https://github.com/NikolayKovzik"
                target="_blank"
                rel="noreferrer"
                className={styles.footerGitContainer}
              >
                <img
                  src={githubImage}
                  alt="github"
                  className={styles.footerGit}
                ></img>
                <p className={styles.footerGitName}>NikolayKovzik</p>
              </a>
              <a
                href="https://github.com/ishah148"
                target="_blank"
                rel="noreferrer"
                className={styles.footerGitContainer}
              >
                <img
                  src={githubImage}
                  alt="github"
                  className={styles.footerGit}
                ></img>
                <p className={styles.footerGitName}>ishah148</p>
              </a>
            </div>

            <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
              <img src={rssImage} alt="rss" className={styles.footerIcon}></img>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer
