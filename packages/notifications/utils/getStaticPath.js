const getStaticPath = (path) => {
	const url = path
		? `${process.env.STATIC_ASSETS_URL}/${path}`
		: process.env.STATIC_ASSETS_URL || '';

	return url.replace(/([^:]\/)\/+/g, '$1');
};

module.exports = getStaticPath;
