import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMImage } from '@cogoport/icons-react';

const STEP_COUNT = 1;
const MINIMUM_COUNT = 2;

const DOT_AFTER_SLASH = 1;

const FILE_ICON_MAPPING = {
	document : <IcMDocument height={18} width={18} fill="#bdbdbd" />,
	img      : <IcMImage height={22} width={25} fill="#bdbdbd" />,
};

const EXTENSIONS_MAPPING = {
	image: {
		icon : FILE_ICON_MAPPING.img,
		type : 'image',
	},
	audio: {
		icon : FILE_ICON_MAPPING.document,
		type : 'audio',
	},
	video: {
		icon : FILE_ICON_MAPPING.img,
		type : 'video',
	},
	default: {
		icon : FILE_ICON_MAPPING.document,
		type : 'document',
	},
};

const MEDIA_EXTENSION_TYPES = {
	image : ['jpg', 'jpeg', 'png', 'svg'],
	audio : ['mp3', 'aac'],
	video : ['mp4', 'mkv', 'mov', 'wmv', 'gif'],
};

export function getFileAttributes({ fileName = '', finalUrl = '' }) {
	const splitFileName = fileName.split('.');
	let extension = '';
	let name = '';

	if (splitFileName.length > MINIMUM_COUNT) {
		extension = splitFileName[splitFileName.length - STEP_COUNT];

		name = splitFileName.slice(
			GLOBAL_CONSTANTS.zeroth_index,
			splitFileName.length - STEP_COUNT,
		).join(' ');
	} else {
		[name, extension] = splitFileName;
	}

	const mediaType = Object.keys(MEDIA_EXTENSION_TYPES).find(
		(itm) => MEDIA_EXTENSION_TYPES[itm].includes(extension),
	);

	const { icon, type } = EXTENSIONS_MAPPING[mediaType || 'default'];

	return {
		fileName      : name,
		fileIcon      : icon,
		fileType      : type,
		fileExtension : extension,
		fileUrl       : finalUrl,
		fileMediaType : mediaType,
	};
}

export const formatFileAttributes = ({
	uploadedFiles = '',
}) => {
	const flattenFilesArray = [uploadedFiles].flat();

	return flattenFilesArray?.map(
		(eachFile = '') => {
			const decodedUrl = decodeURI(eachFile);
			const file = decodedUrl?.substring(decodedUrl.lastIndexOf('/') + DOT_AFTER_SLASH);

			return getFileAttributes({ fileName: file, finalUrl: eachFile });
		},
	);
};
