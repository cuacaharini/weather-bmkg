/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["cdn.bmkg.go.id"],
  },

  experimental: {
    serverActions: false,
  },
}

module.exports = nextConfig
