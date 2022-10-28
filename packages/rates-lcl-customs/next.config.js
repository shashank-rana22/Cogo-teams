/** @type {import('next').NextConfig} */

const commonNextConfig = require('@cogoport/admin-commons/configs/next.config');

module.exports = {
	...commonNextConfig,
	basePath: '/rates/lcl-customs',
};
