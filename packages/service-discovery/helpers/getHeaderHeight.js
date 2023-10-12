const DEFAULT_HEIGHT_VALUE = 0;

const getHeaderHeight = () => {
	const element = document.getElementById('search_to_checkout_main_header');

	if (!element) {
		return DEFAULT_HEIGHT_VALUE;
	}
	return element.offsetHeight;
};

export default getHeaderHeight;
