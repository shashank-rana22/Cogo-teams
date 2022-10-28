/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode : true,
	swcMinify       : true,
	basePath        : '/rates/lcl-freight',
	assetPrefix     : '/rates/lcl-freight',
	webpack(config) {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
};
