/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
