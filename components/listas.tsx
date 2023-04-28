import React, { FC, useState, useRef, useEffect } from "react";
import { Movie, MovieSmall } from "../types/movie";
import styles from "../styles/listas.module.scss";
import { motion, useDragControls, useAnimation } from "framer-motion";

import CardSmall from "./cardSmall";

type topWeek = {
  titleSeccion: string;
  moviesLista: Movie[] | MovieSmall[];
};

const Listas: FC<topWeek> = ({ moviesLista, titleSeccion }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLElement>(null);
  const lista = useRef<HTMLElement>(null);

  const animation = useAnimation();
  const dragControls = useDragControls();

  useEffect(() => {
    animation.start({ x: 0 });
    setWidth(lista!.current!.scrollWidth - carousel!.current!.offsetWidth);
  }, [moviesLista]);

  const dragConstraints = {
    right: 0,
    left: -width,
  };

  return (
    <div className={styles.containTopWeek}>
      <div className={styles.containCenter}>
        <h2>{titleSeccion}</h2>
      </div>
      <motion.div
        className={styles.containCenter}
        style={{ overflowX: "hidden" }}
        /* @ts-ignore */
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className={styles.slider}
          drag="x"
          dragConstraints={dragConstraints}
          /* @ts-ignore */
          ref={lista}
          dragControls={dragControls}
          animate={animation}
        >
          {moviesLista.map((movie, index) => {
            return (
              <motion.div key={index}>
                <CardSmall moviesProps={movie} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Listas;
