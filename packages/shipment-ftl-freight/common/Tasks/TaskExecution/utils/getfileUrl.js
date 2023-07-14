const FIRST_INDEX = 1;
const getfileUrl = ({ url }) => {
	if (url?.includes('finalUrl')) {
		const REGEX = /:finalUrl=>"([^"]*)"/;
		const match = url.match(REGEX);

		return match?.[FIRST_INDEX];
	}

	return url;
};
export default getfileUrl;
