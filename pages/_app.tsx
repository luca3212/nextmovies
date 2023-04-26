import "../styles/globals.css";
import type { AppProps } from "next/app";
import FavoritosProvider from "../contexts/ListaFavoritos";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritosProvider>
      <Component {...pageProps} />
    </FavoritosProvider>
  );
}

export default MyApp;
