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
    ],
    // ⚠️ Dev-only: allow optimizing images from localhost
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
