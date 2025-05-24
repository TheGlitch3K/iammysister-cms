/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  output: 'export',
  distDir: 'dist',
  basePath: process.env.NODE_ENV === 'production' ? '/iammysister-cms' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/iammysister-cms/' : '',
}

module.exports = nextConfig
