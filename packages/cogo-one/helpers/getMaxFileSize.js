import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ZALO_LIMITATION_SIZE = {
	image : Number(GLOBAL_CONSTANTS.options.upload_file_size['1MB']),
	file  : Number(GLOBAL_CONSTANTS.options.upload_file_size['5MB']),
};

const ZALO_FILE_TYPES = [
	'application/pdf',
	'text/csv',
];

export const getFileType = (type) => {
	if ((type || '').includes('image')) return 'image';
	if (ZALO_FILE_TYPES.includes(type)) return 'file';
	return '';
};

const getMaxFileSize = (type = '') => {
	const fileType = getFileType(type);
	return ZALO_LIMITATION_SIZE[fileType];
};

export default getMaxFileSize;
