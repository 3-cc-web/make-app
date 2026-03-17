// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'hjuiymcbwtfgvjizlric.supabase.co',
//         port: '',
//         pathname: '/storage/v1/object/public/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hjuiymcbwtfgvjizlric.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   // Next.jsの<Image>コンポーネントは、セキュリティのためデフォルトで外部画像を読み込めないので追記
//   // protocol: 'https' → httpsプロトコルのみ許可
//   // hostname: '**.supabase.co' → *.supabase.co のすべてのサブドメインを許可
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**.supabase.co',
//       },
//     ],
//   },
// };

// export default nextConfig;
