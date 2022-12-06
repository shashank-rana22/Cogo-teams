/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-unresolved
const loadEnvConfig = require('@cogoport/commons/helpers/load-env');
const withTM = require('next-transpile-modules')([
	'@cogoport/commons',
	'@cogoport/authentication',
	'@cogoport/home',
]);

module.exports = withTM({
	env: {
		...loadEnvConfig.parsed,
	},
	reactStrictMode : true,
	swcMinify       : true,
	webpack         : (config) => {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
}, []);
