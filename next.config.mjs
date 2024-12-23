/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        
        return [
            {
                source: '/', // The route to redirect from
                destination: '/ui', // The route to redirect to
                permanent: true, // This can be true for a 301 redirect
            },
        ];
    },
};


export default nextConfig;
