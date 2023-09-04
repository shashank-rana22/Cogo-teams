const FIRST_CHARACTER = 1;

const useGetFormatedPath = () => {
	const fragmentIdentifier = window.location.hash.slice(FIRST_CHARACTER);
	const QUERYPARAMS = {};
	const keyValuePairs = fragmentIdentifier.split('&');
	keyValuePairs.forEach((keyValue) => {
		const [key, value] = keyValue.split('=');
		QUERYPARAMS[key] = value;
	});
	return { queryParams: QUERYPARAMS };
};

export default useGetFormatedPath;
