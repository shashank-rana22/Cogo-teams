import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getMaxFileSize, { getFileType } from '../helpers/getMaxFileSize';

const ROUND_UP_TO = 2;

const validateZaloFileUpload = ({ values = [] }) => {
	if (isEmpty(values || [])) return true;

	if (getFileType(values[GLOBAL_CONSTANTS.zeroth_index]?.type) === '') {
		Toast.error('File Type Not Allowed');
		return false;
	}

	const maxSize = getMaxFileSize(values[GLOBAL_CONSTANTS.zeroth_index]?.type);

	if (values[GLOBAL_CONSTANTS.zeroth_index]?.size >= maxSize) {
		const sizeInMb = (maxSize / Number(GLOBAL_CONSTANTS.options.upload_file_size['1MB'])).toFixed(ROUND_UP_TO);
		Toast.error(`File Upload failed, Maximum size allowed - ${sizeInMb} MB`);
		return false;
	}

	return true;
};

const defaultValidation = () => true;

const UPLOAD_VALIDATION_MAPPING = {
	zalo         : validateZaloFileUpload,
	whatsapp_sid : validateZaloFileUpload,
	default      : defaultValidation,
};

export default UPLOAD_VALIDATION_MAPPING;
