const openDocument = (url) => {
	let modifiedUrl = `https://${url}`;
	if (url?.includes('http://') || url?.includes('https://')) {
		modifiedUrl = url;
	}

	window.open(modifiedUrl, '_blank');
};
export default openDocument;
