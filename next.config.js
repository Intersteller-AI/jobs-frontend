/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "st1.zoom.us",
      },
      {
        protocol: "https",
        hostname: "us04images.zoom.us",
      },
      {
        protocol: "https",
        hostname: "blog-app-backend-e3mj.onrender.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
