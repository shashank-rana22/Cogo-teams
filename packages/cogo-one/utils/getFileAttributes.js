import { IcMDocument, IcMImage } from '@cogoport/icons-react';

const fileIconMapping = {
	document : <IcMDocument height={22} width={22} />,
	img      : <IcMImage height={22} width={25} />,
};

function getFileAttributes({ fileName = '', finalUrl }) {
	const splitFileName = fileName.split('.');
	let fileExtension = '';
	let uploadedFileName = '';
	let fileType = '';

	let fileIcon = null;
	if (splitFileName.length > 1) {
		fileExtension = splitFileName.pop();
		uploadedFileName = splitFileName.join('');
	} else {
		fileExtension = 'document';
		uploadedFileName = fileName;
	}

	if (['jpeg', 'jpg', 'png', 'svg'].includes(fileExtension)) {
		fileIcon = fileIconMapping.img;
		fileType = 'image';
	} else if (['mp3', 'aac'].includes(fileExtension)) {
		fileIcon = fileIconMapping.document;
		fileType = 'audio';
	} else if (['mp4', 'gif'].includes(fileExtension)) {
		fileIcon = fileIconMapping.img;
		fileType = 'video';
	} else {
		fileIcon = fileIconMapping.document;
		fileType = 'document';
	}

	return { uploadedFileName, fileIcon, fileType, finalUrl };
}

export default getFileAttributes;
