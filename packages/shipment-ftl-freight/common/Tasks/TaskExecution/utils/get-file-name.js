export const getFileName = (url) => {
	const lastVal = url?.split('/')?.pop();
	const filename = decodeURIComponent(lastVal);
	return filename;
};
