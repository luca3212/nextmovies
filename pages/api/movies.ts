import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nroPage } = req.query;
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.key_api}&language=es&page=${nroPage}`
    );
    const data = await tmdbRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Error fetching popular movies" });
  }
}
