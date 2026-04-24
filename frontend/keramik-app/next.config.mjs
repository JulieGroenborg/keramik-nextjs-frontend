const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '51857',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'keramik-umbraco-backend-production.up.railway.app',
        pathname: '/media/**',
      },
    ],
    // Kun true hvis vi er i dev
    dangerouslyAllowLocalIP: !isProd,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/forside',
        permanent: true, // permanent true gør at browsere cacher redirecten, så den vil ikke prøve at gå til '/' igen.
      },
    ];
  },
};

export default nextConfig;
