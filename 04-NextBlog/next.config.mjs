/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "supabase.dupa.blada",
      },
    ],
  },
};

export default nextConfig;
