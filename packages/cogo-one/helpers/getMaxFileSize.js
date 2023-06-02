const ONE_MB = 1048576;

const ZALO_LIMIATION_SIZE = {
	image : ONE_MB,
	file  : 5 * ONE_MB,
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
	return ZALO_LIMIATION_SIZE[fileType];
};

export default getMaxFileSize;
