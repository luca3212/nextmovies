import React from "react";
import Logo from "./icons/logo";
import styles from "../styles/menu.module.scss";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className={styles.containMenu}>
      <div onClick={() => handleLinkClick("/")} className={styles.containLogo}>
        <Logo />
      </div>
      <nav className={styles.containNav}>
        <a href="/#inicio" onClick={() => handleLinkClick("/#inicio")}>
          Inicio
        </a>
        <a href="/#top-movies" onClick={() => handleLinkClick("/#top-movies")}>
          Top Movies
        </a>
        <a href="/#populares" onClick={() => handleLinkClick("/#populares")}>
          Populares
        </a>
        <a href="/#mi-lista" onClick={() => handleLinkClick("/#mi-lista")}>
          Mi Lista
        </a>
      </nav>
    </div>
  );
}
