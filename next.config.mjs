/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // remotePatterns: ["https://brwrlrfibkmgwxzgeugr.supabase.co/**/*"],
    domains: ["brwrlrfibkmgwxzgeugr.supabase.co"],
  },
};

export default nextConfig;
