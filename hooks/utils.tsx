import { generos } from "../pages/api/dataGenero";
import { Videos, dataTrailer } from "../types/movie";

type generoProps = {
  id: number;
  name: string;
};

//recibe un array de ids de Generos - Funcion para Portada
export function nameGeneroId(idsGenero: number[]): string {
  if (idsGenero.length >= 2) {
    const generoPrincipal = generos.find((elemt) => elemt.id === idsGenero[0]);
    const generoSecundario = generos.find((elemt) => elemt.id === idsGenero[1]);
    return `${generoPrincipal?.name} • ${generoSecundario?.name}`;
  } else {
    if (idsGenero.length != 0) {
      const nombreGenero = generos.find((elemt) => elemt.id === idsGenero[0]);
      return nombreGenero ? nombreGenero.name : "";
    } else {
      return "";
    }
  }
}

//recibe un array typo generoProps - funcion para Page detalles
export function nameGeneroType(tipeGenero: generoProps[]): string {
  if (tipeGenero.length != 0) {
    if (tipeGenero.length >= 2) {
      const generoPrincipal = tipeGenero[0].name;
      const generoSecundario = tipeGenero[1].name;
      return `${generoPrincipal} • ${generoSecundario}`;
    } else {
      const generoPrincipal = tipeGenero[0].name;
      return `${generoPrincipal}`;
    }
  } else {
    return "";
  }
}

export function duracionPeli(tiempo: number | null): string {
  if (tiempo != null) {
    let hora: number = Math.trunc(tiempo / 60);
    let minutos: number = tiempo - hora * 60;
    const duracion = `${hora}h ${minutos}min`;
    return duracion;
  } else {
    return "No disponible";
  }
}

export function trailerMovie(videos: Videos[]): dataTrailer[] | null {
  // Verificar si la respuesta contiene datos de video
  if (videos.length > 0) {
    // Buscar el video con el tipo "Trailer" en la respuesta
    const trailer = videos.find((video) => video.type === "Trailer");
    const teaser = videos.find((video) => video.type === "Teaser");

    let videosT: dataTrailer[] = [];

    // Si se encuentra un trailer, devolver su ID de video de YouTube
    if (trailer && trailer.key) {
      videosT.push({
        title: "Trailer",
        keyVideo: trailer.key,
      });
    }

    if (teaser && teaser.key) {
      videosT.push({
        title: "Teaser",
        keyVideo: teaser.key,
      });
    }

    if (videosT.length > 0) {
      return videosT;
    }
  }

  // Si no se encuentra un trailer, devolver null
  return null;
}
