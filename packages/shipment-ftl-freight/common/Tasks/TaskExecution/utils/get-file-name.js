import { isEmpty } from '@cogoport/utils';

export const getFileName = (url) => {
	if (isEmpty(url)) {
		return undefined;
	}
	const lastVal = url?.split('/')?.pop();
	const filename = decodeURIComponent(lastVal);
	return filename;
};
