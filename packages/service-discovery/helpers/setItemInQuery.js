const setItemInQuery = ({ key, value }) => {
	if (value) {
		const newUrl = new URL(window.location);
		newUrl.searchParams.set(key, value);

		window.history.pushState({ path: newUrl.href }, '', newUrl.href);
	} else {
		const newUrl = new URL(window.location);
		newUrl.searchParams.delete(key);

		window.history.pushState({ path: newUrl.href }, '', newUrl.href);
	}
};

export default setItemInQuery;
