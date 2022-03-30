/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SOCKET_CONN: process.env.SOCKET_CONN,
    ENV: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
