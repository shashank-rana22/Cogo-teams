import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms';

const showErrorsInToast = (messages, t = () => {}) => {
	Toast.error(
		getApiErrorString?.(messages || {})
			// eslint-disable-next-line max-len
			|| t('notifications:default_error_toast'),
		{ hideAfter: 6 },
	);
};

export default showErrorsInToast;
