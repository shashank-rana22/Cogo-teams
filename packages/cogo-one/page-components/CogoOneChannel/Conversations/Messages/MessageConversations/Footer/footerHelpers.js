import { IcMDocument, IcMImage } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

const DOT_AFTER_SLASH = 1;

const FILE_ICON_MAPPING = {
	document : <IcMDocument height={22} width={22} fill="#4f4f4f" />,
	img      : <IcMImage height={22} width={25} fill="#4f4f4f" />,
};

const IMAGE_TYPE = { icon: FILE_ICON_MAPPING.img, type: 'image' };

const DOCUMENT_TYPE = { icon: FILE_ICON_MAPPING.document, type: 'document' };

const VIDEO_TYPE = { icon: FILE_ICON_MAPPING.img, type: 'video' };

const AUDIO_TYPE = { icon: FILE_ICON_MAPPING.document, type: 'audio' };

const EXTENSIONS_MAPPING = {
	jpeg    : IMAGE_TYPE,
	jpg     : IMAGE_TYPE,
	png     : IMAGE_TYPE,
	svg     : IMAGE_TYPE,
	mp3     : AUDIO_TYPE,
	aac     : AUDIO_TYPE,
	mp4     : VIDEO_TYPE,
	gif     : VIDEO_TYPE,
	default : DOCUMENT_TYPE,
};

export const formatFileAttributes = ({ uploadedFiles = '' }) => {
	const flattenFilesArray = [uploadedFiles].flat();

	const formattedDataArray = flattenFilesArray?.map((eachFile = '') => {
		const decodedUrl = decodeURI(eachFile);
		const file = decodedUrl?.substring(decodedUrl.lastIndexOf('/') + DOT_AFTER_SLASH);

		let fileName = file;
		let extension;

		if (file.includes('.')) {
			[fileName, extension] = file.split('.') || [];
		}

		const { icon, type } = EXTENSIONS_MAPPING[extension] || EXTENSIONS_MAPPING.default;

		return {
			fileName,
			icon,
			type,
			fileUrl: eachFile,
			file,
		};
	});

	return formattedDataArray;
};

export const getCanSendMessage = ({ emailState = {}, channelType = '' }) => {
	if (channelType !== 'email') {
		return true;
	}

	const { subject = '', toUserEmail = [] } = emailState || {};

	return (!isEmpty(subject) && !isEmpty(toUserEmail));
};
