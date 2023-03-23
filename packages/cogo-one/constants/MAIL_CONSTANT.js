import getFileAttributes from '../utils/getFileAttributes';

export const isInList = (email, data) => data?.includes(email);

export const validateEmail = (emailInput) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(emailInput);
};

export const decode = (data = '') => {
	const val = decodeURI(data).split('/');
	const fileName = val[val.length - 1];
	const { uploadedFileName, fileIcon } = getFileAttributes({ fileName, finalUrl: data });
	return { uploadedFileName, fileIcon };
};

export const buttonOptions = ['reply', 'reply_all', 'forward'];
