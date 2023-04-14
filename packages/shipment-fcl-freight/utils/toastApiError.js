import { Toast } from '@cogoport/components';

export default function toastApiError(err) {
	const message = err?.response?.data?.message || err?.message || 'Something went wrong !!';
	if (message !== 'canceled') { Toast.error(message); }
}
