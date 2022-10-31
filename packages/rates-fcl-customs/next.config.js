/** @type {import('next').NextConfig} */

const commonNextConfig = require('@cogoport/admin-commons/configs/next.config');

console.log({ commonNextConfig });

module.exports = {
	...commonNextConfig,
	basePath: '/rates/fcl-customs',
};
