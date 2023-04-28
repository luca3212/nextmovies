import React, { FC, useEffect, useState, useContext } from "react";
import { Movie, MovieSmall } from "../types/movie";
import styles from "../styles/cardGrid.module.scss";
import Image from "next/image";
import FavFalse from "./icons/favFalse";
import FavTrue from "./icons/favTrue";

import { FavoritoContext, TareasFavoritos } from "../contexts/ListaFavoritos";
import { useRouter } from "next/router";
import ImagenNo from "./icons/imagenNo";

type CardProps = {
  moviesProps: Movie | MovieSmall;
};

const CardGrid: FC<CardProps> = ({ moviesProps }) => {
  const { listaFavoritos, idFavorito, addFavorito, deleteFavorito } =
    useContext(FavoritoContext) as TareasFavoritos;
  const router = useRouter();
  const [isFavorita, setIsFavorita] = useState<boolean>(false);

  const [loadingImg, setLoadingImg] = useState(
    moviesProps.poster_path != null ? true : false
  );

  useEffect(() => {
    setIsFavorita(idFavorito(moviesProps.id));
  }, [moviesProps, listaFavoritos, idFavorito]);

  useEffect(() => {
    setLoadingImg(moviesProps.poster_path != null ? true : false);
  }, [moviesProps.poster_path]);

  const handleAddFavorito = () => {
    const guardarMovie: MovieSmall = {
      id: moviesProps.id,
      title: moviesProps.title,
      poster_path: moviesProps.poster_path,
      overview: moviesProps.overview,
      release_date: moviesProps.release_date,
      runtime: moviesProps.runtime,
      backdrop_path: moviesProps.backdrop_path,
    };

    addFavorito(guardarMovie);
    setIsFavorita(true);
  };

  const handleDeleteFavorito = () => {
    deleteFavorito(moviesProps.id);
    setIsFavorita(false);
  };

  const handleDetalles = () => {
    router.push(`/${moviesProps.id}`);
  };

  const handleCompleted = () => {
    setLoadingImg(false);
  };

  return (
    <div className={styles.containCard}>
      <div className={styles.containImagen}>
        {loadingImg && <div className={styles.containLoading}></div>}
        {moviesProps.poster_path != null ? (
          <Image
            key={moviesProps.id}
            className={styles.imagenFondo}
            alt="imagen Portada"
            src={`https://image.tmdb.org/t/p/original${moviesProps.poster_path}`}
            width={200}
            height={300}
            quality={70}
            draggable="false"
            onLoadingComplete={handleCompleted}
            priority
          />
        ) : (
          <ImagenNo />
        )}
      </div>
      <div className={styles.containBtonLike}>
        {isFavorita ? (
          <button onClick={handleDeleteFavorito}>
            <FavTrue />
          </button>
        ) : (
          <button onClick={handleAddFavorito}>
            <FavFalse />
          </button>
        )}
      </div>
      <div className={styles.containTitle}>
        <button onClick={handleDetalles}>{moviesProps.title}</button>
      </div>
    </div>
  );
};

export default CardGrid;
