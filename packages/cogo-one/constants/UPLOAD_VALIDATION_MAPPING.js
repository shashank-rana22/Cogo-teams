import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getMaxFileSize, { getFileType } from '../helpers/getMaxFileSize';

const validateZaloFileUpload = ({ values = [] }) => {
	if (isEmpty(values || [])) return true;

	if (getFileType(values[0]?.type) === '') {
		Toast.error('File Type Not Allowed');
		return false;
	}

	const maxSize = getMaxFileSize(values[0]?.type);

	if (values[0]?.size >= maxSize) {
		const sizeInMb = (maxSize / GLOBAL_CONSTANTS.one_mb).toFixed(2);
		Toast.error(`File Upload failed, Maximum size allowed - ${sizeInMb} MB`);
		return false;
	}

	return true;
};

const defaultValidation = () => true;

const UPLOAD_VALIDATION_MAPPING = {
	zalo    : validateZaloFileUpload,
	default : defaultValidation,
};

export default UPLOAD_VALIDATION_MAPPING;
