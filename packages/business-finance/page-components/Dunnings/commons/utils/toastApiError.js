import { Toast } from '@cogoport/components';

const toastApiError = (err) => {
	const { response, message:errMessage } = err || {};
	const { data } = response || {};
	let message = '';
	if (data) {
		if (data?.base) {
			message = data.base;
		} else if (data.message) {
			message = data.message;
		}
	} else if (errMessage) {
		message = errMessage;
	}
	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
};

export default toastApiError;
