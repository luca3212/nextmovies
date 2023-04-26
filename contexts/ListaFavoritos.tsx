import * as React from "react";
import { MovieSmall } from "../types/movie";

export type TareasFavoritos = {
  listaFavoritos: MovieSmall[];
  setListaFavoritos: (lista: MovieSmall[]) => void;
  idFavorito: (idMovie: number) => boolean;
  addFavorito: (movieSave: MovieSmall) => void;
  deleteFavorito: (idMovie: number) => void;
};

export const FavoritoContext = React.createContext<TareasFavoritos | null>(
  null
);

interface MyComponentProps {
  children: React.ReactNode;
}

function FavoritosProvider({ children }: MyComponentProps): JSX.Element {
  const [listaFavoritos, setListaFavoritos] = React.useState<MovieSmall[]>([]);

  const idFavorito = (idMovie: number): boolean => {
    if (listaFavoritos.length != 0) {
      return listaFavoritos.some((movie: MovieSmall) => movie.id == idMovie);
    }
    return false;
  };

  const addFavorito = (movieSave: MovieSmall) => {
    const newLista = [...listaFavoritos, movieSave];
    setListaFavoritos(newLista);
    localStorage.setItem("miLista", JSON.stringify(newLista));
  };

  const deleteFavorito = (idMovie: number) => {
    const newLista = listaFavoritos.filter(
      (movie: MovieSmall) => movie.id != idMovie
    );
    setListaFavoritos(newLista);
    localStorage.setItem("miLista", JSON.stringify(newLista));
  };

  return (
    <FavoritoContext.Provider
      value={{
        listaFavoritos,
        setListaFavoritos,
        idFavorito,
        addFavorito,
        deleteFavorito,
      }}
    >
      {children}
    </FavoritoContext.Provider>
  );
}

export default FavoritosProvider;
