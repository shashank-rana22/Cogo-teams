import { Toast } from '@cogoport/components';

const toastApiError = (err) => {
	let message = '';
	if (err?.response?.data) {
		if (err.response.data?.base) {
			message = err.response.data.base;
		} else if (err.response.data.message) {
			message = err.response.data.message;
		}
	} else if (err?.message) {
		message = err.message;
	}
	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
};

export default toastApiError;
