import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms';

const showErrorsInToast = (messages) => {
	Toast.error(
		getApiErrorString(messages || {})
			// eslint-disable-next-line max-len
			|| 'The application has encountered an unknown error. Our team is looking into this with the utmost urgency. Please try again after some time. If the issue persists, please contact us via chat.',
		{ hideAfter: 6 },
	);
};

export default showErrorsInToast;
