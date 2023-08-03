import { isEmpty } from '@cogoport/utils';

import getFileAttributes from '../../../../../../utils/getFileAttributes';

const DOT_AFTER_SLASH = 1;

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

export const getCanSendMessage = ({
	emailState = {},
	channelType = '',
}) => {
	if (channelType !== 'email') {
		return true;
	}

	const { subject = '', toUserEmail = [] } = emailState || {};

	return (!isEmpty(subject) && !isEmpty(toUserEmail));
};
