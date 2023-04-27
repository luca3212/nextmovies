import React from "react";
import Logo from "./icons/logo";
import styles from "../styles/menu.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import MenuIcon from "./icons/menu";
import Close from "./icons/close";

type Props = {
  toggle: () => void;
  state: boolean;
};

export default function Menu({ toggle, state }: Props) {
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
        <Link href="/#inicio">Inicio</Link>
        <Link href="/#top-movies">Top Movies</Link>
        <Link href="/#populares">Populares</Link>
        <Link href="/#mi-lista">Mi Lista</Link>
      </nav>
      <div className={styles.btonMenu}>
        {state ? (
          <button onClick={toggle}>
            <Close />
          </button>
        ) : (
          <button onClick={toggle}>
            <MenuIcon />
          </button>
        )}
      </div>
    </div>
  );
}
