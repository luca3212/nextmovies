import React, { FC, useState, useEffect, useContext } from "react";
import { Movie, MovieSmall } from "../types/movie";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/portada.module.scss";
import Image from "next/image";
import Star from "./icons/star";

import Like from "./icons/like";
import ChevronLeft from "./icons/chevronLeft";
import ChevronRight from "./icons/chevronRight";
import Mas from "./icons/mas";

import { nameGeneroId } from "../hooks/utils";

import { FavoritoContext, TareasFavoritos } from "../contexts/ListaFavoritos";
import FavFalse from "./icons/favFalse";
import { useRouter } from "next/router";

type PortadaProps = {
  moviesProps: Movie[];
};

const Portada: FC<PortadaProps> = ({ moviesProps }) => {
  const { listaFavoritos, idFavorito, addFavorito, deleteFavorito } =
    useContext(FavoritoContext) as TareasFavoritos;

  const [isFavorita, setIsFavorita] = useState<boolean>(false);

  const [dataMovies, setDataMovies] = useState(moviesProps.slice(0, 5));
  const [movieMain, setMovieMain] = useState(dataMovies[0]);
  const [focusMovie, setFocusMovie] = useState(0);

  const router = useRouter();

  const handleVerMas = () => {
    router.push(`/${movieMain.id}`);
  };

  const limite = 250;
  function limitarContenido(texto: string): string {
    if (texto.length <= limite) {
      return texto;
    } else {
      return texto.slice(0, limite) + "...";
    }
  }

  useEffect(() => {
    setIsFavorita(idFavorito(movieMain.id));
  }, [movieMain, listaFavoritos, idFavorito]);

  const handleClick = (valor: number) => {
    if (valor > 0) {
      if (focusMovie === 4) {
        setFocusMovie(0);
      } else {
        setFocusMovie((prev) => prev + valor);
      }
    } else {
      if (focusMovie === 0) {
        setFocusMovie(4);
      } else {
        setFocusMovie((prev) => prev + valor);
      }
    }
  };

  const handleFavorito = () => {
    if (isFavorita) {
      deleteFavorito(movieMain.id);
      setIsFavorita(false);
    } else {
      const guardarMovie: MovieSmall = {
        id: movieMain.id,
        title: movieMain.title,
        poster_path: movieMain.poster_path,
        overview: movieMain.overview,
        release_date: movieMain.release_date,
        runtime: movieMain.runtime,
        backdrop_path: movieMain.backdrop_path,
      };
      addFavorito(guardarMovie);
      setIsFavorita(true);
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setFocusMovie((prevFocus) => (prevFocus + 1) % 5);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [focusMovie]);

  useEffect(() => {
    setMovieMain(dataMovies[focusMovie]);
  }, [focusMovie, dataMovies]);

  return (
    <div className={styles.containPortada}>
      <motion.div
        key={movieMain.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={styles.imagenPortada}
      >
        <Image
          key={movieMain.id}
          className={styles.imagenFondo}
          alt="imagen Portada"
          src={`https://image.tmdb.org/t/p/original${movieMain.backdrop_path}`}
          fill
          quality={75}
          priority
        />
      </motion.div>

      <div className={styles.containCenter}>
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.containInfo}
            key={movieMain.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.containTitle}>
              <h2>{movieMain.title}</h2>
            </div>

            <div className={styles.infoMovie}>
              <div className={styles.votoMovie}>
                <Star />
                <strong>{movieMain.vote_average.toFixed(2)}</strong> |{" "}
                <p>{movieMain.vote_count}</p>
              </div>

              <div className={styles.genero}>
                <p>{nameGeneroId(movieMain.genre_ids)}</p>
              </div>
              <div className={styles.fecha}>
                <p>{movieMain.release_date.slice(0, 4)}</p>
              </div>
            </div>

            <div className={styles.containDescripcion}>
              <p>{limitarContenido(movieMain.overview)}</p>
            </div>

            <div className={styles.containBton}>
              <button onClick={handleVerMas} className={styles.btonInicio}>
                <Mas /> <p>Mas info</p>
              </button>
              <button
                onClick={handleFavorito}
                className={styles.btonInicio}
                style={{ background: "#1a1a1a", color: "#f3f3f3" }}
              >
                {isFavorita ? <Like /> : <FavFalse />} <p>Mi lista</p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className={styles.btonArrow + " " + styles.btonLeft}
        onClick={() => handleClick(-1)}
      >
        <ChevronLeft />
      </button>
      <button
        className={styles.btonArrow + " " + styles.btonRight}
        onClick={() => handleClick(1)}
      >
        <ChevronRight />
      </button>

      <div className={styles.containCirculos}>
        <div
          style={{
            background: focusMovie === 0 ? "#ab6aff" : "#1a1a1a",
            width: focusMovie === 0 ? "30px" : "10px",
          }}
          className={styles.posicion}
        ></div>
        <div
          style={{
            background: focusMovie === 1 ? "#ab6aff" : "#1a1a1a",
            width: focusMovie === 1 ? "30px" : "10px",
          }}
          className={styles.posicion}
        ></div>
        <div
          style={{
            background: focusMovie === 2 ? "#ab6aff" : "#1a1a1a",
            width: focusMovie === 2 ? "30px" : "10px",
          }}
          className={styles.posicion}
        ></div>
        <div
          style={{
            background: focusMovie === 3 ? "#ab6aff" : "#1a1a1a",
            width: focusMovie === 3 ? "30px" : "10px",
          }}
          className={styles.posicion}
        ></div>
        <div
          style={{
            background: focusMovie === 4 ? "#ab6aff" : "#1a1a1a",
            width: focusMovie === 4 ? "30px" : "10px",
          }}
          className={styles.posicion}
        ></div>
      </div>
    </div>
  );
};

export default Portada;
