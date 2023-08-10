import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FILE_LIMITATION_SIZE = {
	image : Number(GLOBAL_CONSTANTS.options.upload_file_size['2MB']),
	file  : Number(GLOBAL_CONSTANTS.options.upload_file_size['5MB']),
};

const FILE_TYPES = [
	'application/pdf',
	'text/csv',
];

export const getCustomFileType = (type) => {
	if ((type || '').includes('image')) return 'image';
	if (FILE_TYPES.includes(type)) return 'file';
	return '';
};

const getCustomMaxFileSize = (type = '') => {
	const fileType = getCustomFileType(type);
	return FILE_LIMITATION_SIZE[fileType];
};

export default getCustomMaxFileSize;
