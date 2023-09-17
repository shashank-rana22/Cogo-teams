const FIRST_CHARACTER = 1;

const getFormatedPath = () => {
	const fragmentIdentifier = window.location.hash.slice(FIRST_CHARACTER);
	const keyValuePairs = fragmentIdentifier?.split('&');

	const queryParams = keyValuePairs?.reduce((acc, keyValue) => {
		const [key, value] = keyValue.split('=');
		acc[key] = value;
		return acc;
	}, {});

	return { queryParams };
};

export default getFormatedPath;
