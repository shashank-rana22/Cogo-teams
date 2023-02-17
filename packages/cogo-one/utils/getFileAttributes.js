import { IcMDocument, IcMPdf, IcMImage } from '@cogoport/icons-react';

const fileIconMapping = {
	doc : <IcMDocument height={22} width={22} />,
	pdf : <IcMPdf height={22} width={22} />,
	img : <IcMImage height={22} width={25} />,

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
		fileExtension = 'doc';
		uploadedFileName = fileName;
	}

	if (['jpeg', 'jpg', 'png', 'svg'].includes(fileExtension)) {
		fileIcon = fileIconMapping.img;
		fileType = 'image';
	} else if (['pdf'].includes(fileExtension)) {
		fileIcon = fileIconMapping.pdf;
		fileType = 'pdf';
	} else {
		fileIcon = fileIconMapping.doc;
		fileType = 'doc';
	}

	return { uploadedFileName, fileIcon, fileType, finalUrl };
}

export default getFileAttributes;
