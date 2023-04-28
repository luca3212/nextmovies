import React, { FC, useState, useRef } from "react";
import { Movie } from "../types/movie";
import styles from "../styles/gridMovies.module.scss";
import ChevronLeft from "./icons/chevronLeft";
import ChevronRight from "./icons/chevronRight";
import Buscar from "./icons/buscar";
import CardGrid from "./cardGrid";

type moreMovies = {
  moviesLista: Movie[];
  page: number;
  totalResults: number;
  totalPages: number;
};

const GridMovies: FC<moreMovies> = ({
  moviesLista,
  page,
  totalResults,
  totalPages,
}) => {
  const [movieView, setMovieView] = useState(moviesLista);
  const [dataPage, setDataPage] = useState({
    pageActual: page,
    totalPaginas: totalPages,
    totalMovies: totalResults,
  });

  const [inputValue, setInputValue] = useState("");

  const [searchActiva, setSearchActiva] = useState({
    status: false,
    text: "",
  });

  const grid = useRef<HTMLDivElement>(null);

  const fetchPageMovies = async (nroPage: number) => {
    try {
      const res = await fetch(`/api/movies?nroPage=${nroPage}`);
      const data = await res.json();

      setMovieView(data.results);
      setDataPage({
        pageActual: data.page,
        totalPaginas: data.total_pages,
        totalMovies: data.total_results,
      });
    } catch (error) {
      console.error("Error fetching page popular movies:", error);
    } finally {
      if (grid.current) {
        const topMargin = grid.current.offsetTop - 61;
        window.scrollTo({
          top: topMargin,
          behavior: "smooth",
        });
      }
    }
  };

  const fetchSearchMovies = async (nameMovie: string) => {
    try {
      const res = await fetch(`/api/searchMovies?nameMovie=${nameMovie}`);
      const data = await res.json();

      setMovieView(data.results);
      setDataPage({
        pageActual: data.page,
        totalPaginas: data.total_pages,
        totalMovies: data.total_results,
      });
    } catch (error) {
      console.error("Error fetching search movies:", error);
    }
  };

  const fetchPageSearch = async (nameMovie: string, nroPage: number) => {
    try {
      const res = await fetch(
        `/api/pageMovies?nameMovie=${nameMovie}&nroPage=${nroPage}`
      );
      const data = await res.json();

      setMovieView(data.results);
      setDataPage({
        pageActual: data.page,
        totalPaginas: data.total_pages,
        totalMovies: data.total_results,
      });
    } catch (error) {
      console.error("Error fetching page SEARch movies:", error);
    } finally {
      if (grid.current) {
        const topMargin = grid.current.offsetTop - 61;
        window.scrollTo({
          top: topMargin,
          behavior: "smooth",
        });
      }
    }
  };

  function handleNext() {
    if (searchActiva.status) {
      fetchPageSearch(searchActiva.text, dataPage.pageActual + 1);
    } else {
      fetchPageMovies(dataPage.pageActual + 1);
    }
  }

  function handlePrev() {
    if (searchActiva.status) {
      fetchPageSearch(searchActiva.text, dataPage.pageActual - 1);
    } else {
      fetchPageMovies(dataPage.pageActual - 1);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() != "") {
      fetchSearchMovies(inputValue);
      setSearchActiva({
        status: true,
        text: inputValue,
      });
    }
  };

  function handleReset() {
    setSearchActiva({
      status: false,
      text: "",
    });
    setMovieView(moviesLista);
    setDataPage({
      pageActual: page,
      totalPaginas: totalPages,
      totalMovies: totalResults,
    });

    setInputValue("");
  }

  return (
    <div className={styles.containGridMovies} ref={grid}>
      <div className={styles.containCenter}>
        {searchActiva.status ? (
          <div className={styles.busquedaTitle}>
            <button onClick={handleReset}>
              <ChevronLeft />
            </button>
            <h4>Resultados sobre:</h4>
            <p>&quot;{searchActiva.text}&quot;</p>
          </div>
        ) : (
          <h2>Mas Populares</h2>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Película a buscar..."
            name="inputMovie"
            id="inputMovie"
            autoComplete="off"
            required
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit">
            <Buscar /> <p>Buscar</p>
          </button>
        </form>
      </div>

      <div className={styles.containMovies}>
        {movieView.length != 0 ? (
          movieView.map((movie: Movie, index) => (
            <CardGrid key={index} moviesProps={movie} />
          ))
        ) : (
          <p>No se encontraron películas</p>
        )}
      </div>

      {dataPage.totalPaginas > 1 && (
        <div className={styles.containPaginacion}>
          <button
            onClick={handlePrev}
            className={`${styles.btonInicio} ${
              dataPage.pageActual <= 1 && styles.btonDisable
            }`}
          >
            <ChevronLeft /> <p>Anterior</p>
          </button>

          <p>
            {dataPage.pageActual} / {dataPage.totalPaginas}
          </p>

          <button
            onClick={handleNext}
            className={`${styles.btonInicio} ${
              dataPage.pageActual == dataPage.totalPaginas && styles.btonDisable
            }`}
            style={{ flexDirection: "row-reverse" }}
          >
            <ChevronRight /> <p>Siguiente</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default GridMovies;
