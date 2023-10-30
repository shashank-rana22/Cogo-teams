import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getStaticPath = ({ path = '' }) => {
	const url = path
		? `${process.env.STATIC_ASSETS_URL}/${path}`
		: process.env.STATIC_ASSETS_URL || '';

	return url.replace(GLOBAL_CONSTANTS.regex_patterns.static_url, '$1');
};

export default getStaticPath;
