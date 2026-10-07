/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  images: { formats: ["image/avif", "image/webp"], unoptimized: isExport },
  ...(isExport ? { output: "export" } : {}),
};

export default nextConfig;
