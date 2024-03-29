/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 's-maxage=31536000, max-age=0',
              },
            ],
          },
        ];
    },
}

module.exports = nextConfig
