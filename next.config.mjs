/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Add SVG loader with @svgr/webpack
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // Add GLSL loader for handling shader files
        config.module.rules.push({
            test: /\.glsl$/,
            use: 'webpack-glsl-loader',
            exclude: /node_modules/,
        });

        return config;
    },
};

export default nextConfig;
