import { Toast } from '@cogoport/components';

export default function toastApiError(err) {
	let message = '';

	const { response = {}, message: msg } = err || {};
	const { data } = response;
	if (data) {
		if (data?.base) {
			message = data.base;
		} else if (data?.message) {
			message = data.message;
		}
	} else if (msg) {
		message = msg;
	}
	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
}
