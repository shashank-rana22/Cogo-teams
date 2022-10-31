/** @type {import('next').NextConfig} */

const appEnvConfig = require('../helpers/load-app-env');

// eslint-disable-next-line import/order
const withTM = require('next-transpile-modules')(['@cogoport/admin-commons']);

const commonNextConfig = withTM({
	env: {
		...appEnvConfig.parsed,
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
});

module.exports = commonNextConfig;
