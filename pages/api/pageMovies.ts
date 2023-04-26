import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nameMovie, nroPage } = req.query;
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.key_api}&language=es&query=${nameMovie}&page=${nroPage}&include_adult=false`
    );
    const data = await tmdbRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching pages search movies:", error);
    res.status(500).json({ error: "Error fetching pages search movies" });
  }
}
