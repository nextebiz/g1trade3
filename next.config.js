// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: [
        "lh3.googleusercontent.com",
        "googleusercontent.com",
        "*.googleusercontent.com",
        "google.com",
        "s3.amazonaws.com",
        "res.cloudinary.com",
        "*.cloudinary.com",
        "cloudinary.com",
      ],
  
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
          port: "",
          pathname: "**",
        },
      ],
    },
  
    //   experimental: {
    //     serverActions: true,
    //   },
  };
  
  module.exports = nextConfig;
  