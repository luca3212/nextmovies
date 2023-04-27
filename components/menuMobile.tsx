import Link from "next/link";
import React from "react";
import styles from "../styles/menuMobile.module.scss";
import { motion } from "framer-motion";

type Props = {
  toggle: () => void;
};

export default function MenuMobile({ toggle }: Props) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className={styles.containMenuMobile}>
      <motion.ul
        className={styles.ulMenu}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.li variants={item} key={1}>
          <Link href="/#inicio" onClick={toggle}>
            Inicio
          </Link>
        </motion.li>
        <motion.li variants={item} key={2}>
          <Link href="/#top-movies" onClick={toggle}>
            Top Movies
          </Link>
        </motion.li>
        <motion.li variants={item} key={3}>
          <Link href="/#populares" onClick={toggle}>
            Populares
          </Link>
        </motion.li>
        <motion.li variants={item} key={4}>
          <Link href="/#mi-lista" onClick={toggle}>
            Mi Lista
          </Link>
        </motion.li>
      </motion.ul>
    </div>
  );
}
