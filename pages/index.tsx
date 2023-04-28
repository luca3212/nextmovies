import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Layout from "../components/layout";
import { Movie, dataComplete } from "../types/movie";
import { GetStaticProps } from "next";
import Portada from "../components/portada";

import Listas from "../components/listas";
import { useEffect, useContext } from "react";

import { FavoritoContext, TareasFavoritos } from "../contexts/ListaFavoritos";
import GridMovies from "../components/gridMovies";

type HomeProps = {
  latestMovies: Movie[];
  // popularMovies: Movie[];
  popularMovies: dataComplete;
  topRatedMovies: Movie[];
  weekTopMovies: Movie[];
};

export default function Home({
  latestMovies,
  popularMovies,
  topRatedMovies,
  weekTopMovies,
}: HomeProps) {
  const { listaFavoritos, setListaFavoritos } = useContext(
    FavoritoContext
  ) as TareasFavoritos;

  useEffect(() => {
    const lista = localStorage.getItem("miLista");
    const miLista = lista ? JSON.parse(lista) : [];
    setListaFavoritos(miLista);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>NextMovies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a1a" />
      </Head>

      <main>
        <Layout>
          <div id="inicio">
            <Portada moviesProps={latestMovies} />
          </div>

          <div id="top-movies">
            <Listas
              titleSeccion="Raking de la Semana"
              moviesLista={weekTopMovies}
            />

            <Listas
              titleSeccion="Rankig Historico"
              moviesLista={topRatedMovies}
            />
          </div>

          <div id="populares">
            <GridMovies
              moviesLista={popularMovies.results}
              page={popularMovies.page}
              totalResults={popularMovies.total_results}
              totalPages={popularMovies.total_pages}
            />
          </div>

          <div id="mi-lista">
            {listaFavoritos.length != 0 ? (
              <Listas titleSeccion="Mi Lista" moviesLista={listaFavoritos} />
            ) : (
              <div className={styles.centerLista}>
                <h2>Mi Lista</h2>
                <p>No hay peliculas marcadas como favoritas</p>
              </div>
            )}
          </div>
        </Layout>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // Realiza las llamadas a la API de TMDB para obtener los datos necesarios
    const [
      latestMoviesResponse,
      popularMoviesResponse,
      topRatedMoviesResponse,
      weekTopMoviesResponse,
    ] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.key_api}&language=es&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.key_api}&language=es&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.key_api}&language=es&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.key_api}`
      ),
    ]);

    // Convierte las respuestas de la API a objetos JSON

    //en Cines
    const latestMovies = await latestMoviesResponse.json();
    //populares (actulizacion diaria)
    const popularMovies = await popularMoviesResponse.json();
    //top de tmdb
    const topRatedMovies = await topRatedMoviesResponse.json();
    //top de la semana
    const weekTopMovies = await weekTopMoviesResponse.json();

    // Retorna los datos obtenidos como props para el componente Home
    return {
      props: {
        latestMovies: latestMovies.results,
        // popularMovies: popularMovies.results,
        popularMovies: popularMovies,
        topRatedMovies: topRatedMovies.results,
        weekTopMovies: weekTopMovies.results,
      },
    };
  } catch (error) {
    console.error("Error al obtener datos de la API de TMDB:", error);
    // Puedes manejar el error de acuerdo a tus necesidades, por ejemplo, redirigir a una página de error
    return {
      props: {
        latestMovies: [],
        popularMovies: [],
        topRatedMovies: [],
        weekTopMovies: [],
      },
    };
  }
};
