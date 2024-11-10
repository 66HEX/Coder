/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Add SVG loader with @svgr/webpack
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
