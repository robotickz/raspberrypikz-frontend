/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "89.46.33.193",
        port: "8090",
        pathname: "/api/files/**/**/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "89.46.33.193",
      //   port: "8090",
      //   pathname: "/api/files/**/**/**",
      // },
      {
        protocol: "https",
        hostname: "pb.raspberrypi.kz",
        port: "",
        pathname: "/api/files/**/**/**",
      },
    ],
  },
  env: {
    PB_IMAGE_URL: "https://pb.raspberrypi.kz",
    PB_HOSTNAME: "https://pb.raspberrypi.kz",
    PB_USERNAME: "ntsmllc@gmail.com",
    PB_PASSWORD: "Yeso2006",
  },
};

module.exports = nextConfig;
