/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['img.staticmb.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
