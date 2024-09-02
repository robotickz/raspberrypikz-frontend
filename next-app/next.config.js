/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "89.46.33.193",
        port: "8025",
        pathname: "/i/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "89.46.33.193",
      //   port: "8090",
      //   pathname: "/api/files/**/**/**",
      // },
      {
        protocol: "https",
        hostname: "picsur.robotic.kz",
        port: "",
        pathname: "/i/**",
      },
    ],
  },
};

module.exports = nextConfig;
