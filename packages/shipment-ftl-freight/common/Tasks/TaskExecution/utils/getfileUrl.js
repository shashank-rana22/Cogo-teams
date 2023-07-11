const getfileUrl = ({ url, FIRST_INDEX }) => {
	if (url?.includes('finalUrl')) {
		const REGEX = /:finalUrl=>"([^"]*)"/;
		const match = url.match(REGEX);

		return match?.[FIRST_INDEX];
	}

	return url;
};
export default getfileUrl;
