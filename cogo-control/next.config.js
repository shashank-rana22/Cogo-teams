/** @type {import('next').NextConfig} */
const path = require('path');

const loadEnvConfig = require('@cogoport/core/helpers/load-env');
// eslint-disable-next-line import/order
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

// eslint-disable-next-line
const fs = require('fs-extra');

const loadCogoModules = () => {
	const rootDirectory = path.join(__dirname, './node_modules/@cogoport');
	const cogoModules = fs.readdirSync(rootDirectory)
		.map((file) => `@cogoport/${file}`);
	return cogoModules;
};

const modulesToTranspile = loadCogoModules();

module.exports = withBundleAnalyzer({
	env               : { ...loadEnvConfig.parsed },
	reactStrictMode   : true,
	swcMinify         : true,
	transpilePackages : modulesToTranspile,
	webpack           : (config) => {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
});
