/** @type {import('next').NextConfig} */
const path = require('path');

const loadEnvConfig = require('@cogoport/core/helpers/load-env');
// eslint-disable-next-line import/order
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

// eslint-disable-next-line import/extensions
const { i18n } = require('./next-i18next.config.js');

const isProd = process.env.NODE_ENV === 'production';

// eslint-disable-next-line
const fs = require('fs-extra');

const loadCogoModules = () => {
	const rootDirectory = path.join(__dirname, './node_modules/@cogoport');
	const cogoModules = fs.readdirSync(rootDirectory)
		.map((file) => `@cogoport/${file}`);
	return cogoModules;
};

const modulesToTranspile = loadCogoModules();

const removeConsole = {
	exclude: ['error'],
};

module.exports = withBundleAnalyzer({
	env               : { ...loadEnvConfig.parsed },
	reactStrictMode   : true,
	swcMinify         : true,
	basePath          : '/v2',
	transpilePackages : modulesToTranspile,
	i18n,
	images            : {
		remotePatterns: [
			{
				protocol : 'https',
				hostname : 'cogoport-production.sgp1.digitaloceanspaces.com',
			},
			{
				protocol : 'https',
				hostname : 'cdn.cogoport.io',
			},
		],
	},
	webpack: (config, { isServer }) => {
		const newConfig = { ...config };

		newConfig.resolve.fallback = {
			...newConfig.resolve.fallback,
			request       : false,
			encoding   	  : false,
			...(isServer
				? {}
				: {
					fs            : false,
					child_process : false,
					net           : false,
					tls           : false,
				  }),
		};

		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
	compiler: {
		removeConsole: isProd ? removeConsole : false,
	},
});
