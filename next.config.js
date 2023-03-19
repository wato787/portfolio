/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

}

module.exports = nextConfig


module.exports = {
  // カスタム404ページを設定する
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/404',
        permanent: true,
      },
    ];
  },
};