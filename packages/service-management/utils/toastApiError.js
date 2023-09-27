import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export default function toastApiError(err) {
	let message = '';

	const { response = {}, message: msg } = err || {};

	const { data } = response;

	if (data) {
		if (Array.isArray(data?.base)) {
			message = data.base[GLOBAL_CONSTANTS.zeroth_index];
		} else if (data?.base) {
			message = data.basxe;
		} else if (data?.message) {
			message = data.message;
		} else if (data?.error) {
			message = data.error;
		} else {
			message = getApiErrorString(data);
		}
	} else if (msg) {
		message = msg;
	}

	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
}
