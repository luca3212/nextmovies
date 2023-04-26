import React from "react";
import styles from "../styles/footer.module.scss";
import Image from "next/image";
import logoJustWatch from "../public/justwatch.svg";
import logoTMDB from "../public/tmbdsmall.svg";

export default function Footer() {
  return (
    <div className={styles.containCenter}>
      <div className={styles.containLogos}>
        <h4>Información y enlaces obtenidos desde:</h4>
        <div className={styles.containSVG}>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={logoTMDB} alt="logo TMDB" className={styles.logos} />
          </a>
          <a
            href="https://www.justwatch.com/ar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={logoJustWatch}
              alt="logo JustWatch"
              className={styles.logos}
            />
          </a>
        </div>
      </div>
      <div className={styles.containCopy}>
        <p>
          Copyright © 2023 <br />
          Hecho por{" "}
          <a
            href="https://agueroluca.com.ar/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Agüero Luca
          </a>
        </p>
      </div>
    </div>
  );
}
