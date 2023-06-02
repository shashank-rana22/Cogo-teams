import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ZALO_LIMITATION_SIZE = {
	image : GLOBAL_CONSTANTS.one_mb,
	file  : 5 * GLOBAL_CONSTANTS.one_mb,
};

const ZALO_FILE_TYPES = [
	'application/pdf',
	'text/csv',
];

const getFileType = (type) => {
	if ((type || '').includes('image')) return 'image';
	if (ZALO_FILE_TYPES.includes(type)) return 'file';
	return '';
};

const getMaxFileSize = (type = '') => {
	const fileType = getFileType(type);
	return ZALO_LIMITATION_SIZE[fileType];
};

export default getMaxFileSize;
