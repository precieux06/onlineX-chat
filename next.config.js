/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Pour le développement
    unoptimized: true // Permet le déploiement sans optimisation d'images
  },
  // Désactive temporairement ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactive temporairement la vérification TypeScript
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
