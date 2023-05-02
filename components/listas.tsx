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
  const [widthValor, setWidth] = useState(0);
  const carousel = useRef<HTMLElement>(null);
  const lista = useRef<HTMLElement>(null);

  const animation = useAnimation();
  const dragControls = useDragControls();

  // useEffect(() => {
  //   const observer = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       if (entry.target === carousel.current) {
  //         animation.start({ x: 0 });
  //         setWidth(
  //           lista!.current!.scrollWidth - carousel!.current!.offsetWidth
  //         );
  //       }
  //     }
  //   });

  //   if (carousel.current) {
  //     observer.observe(carousel.current);
  //   }

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    animation.start({ x: 0 });
    setWidth(lista!.current!.scrollWidth - carousel!.current!.offsetWidth);
  }, [moviesLista]);

  let dataContraints = {
    right: 0,
    left: -widthValor,
  };

  return (
    <div className={styles.containTopWeek}>
      <div className={styles.containCenter}>
        <h2>{titleSeccion}</h2>
      </div>
      <motion.div
        className={styles.containCenter}
        style={{ overflowX: "hidden" }}
        whileTap={{ cursor: "grabbing" }}
        /* @ts-ignore */
        ref={carousel}
      >
        <motion.div
          className={styles.slider}
          drag="x"
          dragConstraints={dataContraints}
          dragControls={dragControls}
          animate={animation}
          dragElastic={0}
          /* @ts-ignore */
          ref={lista}
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
