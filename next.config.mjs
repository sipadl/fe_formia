    /** @type {import('next').NextConfig} */
    
    const nextConfig = {
        // async redirects() {     return [         {             source: '/',  The
        // route to redirect from              destination: '/ui',  The route to
        // redirect to             permanent: true,  This can be true for a 301 redirect
        // },     ]; },
        eslint: {
            // Warning: This allows production builds to successfully complete even if your
            // project has ESLint errors.
            ignoreDuringBuilds: true
        }
    };

    export default nextConfig;
