/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode : true,
	swcMinify       : true,
	basePath        : '/rate-management/fcl',
	assetPrefix     : '/rate-management/fcl',
	webpack(config) {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
};
