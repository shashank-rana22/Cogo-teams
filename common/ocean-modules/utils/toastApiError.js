import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

export default function toastApiError(err) {
	let message = '';

	if (!isEmpty(err?.response?.data)) {
		if (err.response.data?.base) {
			message = err.response.data.base;
		} else if (err.response.data.message) {
			message = err.response.data.message;
		} else {
			const [firstKey, firstValue] = 	Object.entries(
				err.response?.data || {},
			)[GLOBAL_CONSTANTS.zeroth_index] || [];
			message = firstKey ? `${firstKey} ${firstValue}` : '';
		}
	} else if (err?.message) {
		message = err.message;
	}
	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
}
