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
        hostname: 'jgebackend-h3bdb9g0hraufsgv.swedencentral-01.azurewebsites.net',
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
        permanent: true, // Sætter HTTP 308. Brug false for HTTP 307 (midlertidig), hvis du tester.
      },
    ];
  },
};

export default nextConfig;
