import React from "react";
import styles from "../styles/footer.module.scss";
import Image from "next/image";
import logoJustWatch from "../public/justwatch.svg";
import logoTMDB from "../public/tmbdsmall.svg";
import Link from "next/link";

export default function Footer() {
  const anio = new Date().getFullYear();
  return (
    <div className={styles.containCenter}>
      <div className={styles.containLogos}>
        <p>Información y enlaces obtenidos desde:</p>
        <div className={styles.containSVG}>
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={logoTMDB} alt="logo TMDB" className={styles.logos} />
          </Link>
          <Link
            href="https://www.justwatch.com/ar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={logoJustWatch}
              alt="logo JustWatch"
              className={styles.logos}
            />
          </Link>
        </div>
      </div>
      <div className={styles.containCopy}>
        <p>
          Copyright © {anio} <br />
          Hecho por{" "}
          <Link
            href="https://agueroluca.site/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Agüero Luca
          </Link>
        </p>
      </div>
    </div>
  );
}
