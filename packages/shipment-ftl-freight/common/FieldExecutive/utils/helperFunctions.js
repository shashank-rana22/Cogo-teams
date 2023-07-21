const LAST_INDEX_VALUE = -1;

export const getFileName = (url) => {
	const lastVal = url?.split('/')?.at(LAST_INDEX_VALUE);
	const filename = decodeURIComponent(lastVal);
	return filename;
};
