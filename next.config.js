/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  output: 'export',
  distDir: 'out',
  basePath: '/iammysister-cms',
  assetPrefix: '/iammysister-cms/',
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig
