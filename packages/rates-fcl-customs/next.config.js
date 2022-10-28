/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode : true,
	swcMinify       : true,
	basePath        : '/rates/fcl-customs',
	assetPrefix     : '/rates/fcl-customs',
	webpack(config) {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
};
