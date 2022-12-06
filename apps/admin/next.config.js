/** @type {import('next').NextConfig} */
const commonNextConfig = require('@cogoport/commons/configs/next.config');
const withTM = require('next-transpile-modules')([
	'@cogoport/commons',
	'@cogoport/authentication',
	'@cogoport/home',
]);

module.exports = withTM({
	...commonNextConfig,
}, []);
