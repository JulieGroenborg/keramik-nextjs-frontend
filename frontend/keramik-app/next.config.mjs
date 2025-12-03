/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '51857',
        pathname: '/**', // or '/**' if you want to allow all paths
      },
    ],
    // ⚠️ Dev-only: allow optimizing images from localhost
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
