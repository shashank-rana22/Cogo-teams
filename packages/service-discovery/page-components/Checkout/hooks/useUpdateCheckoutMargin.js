import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCheckoutMargin = ({ getCheckout, setCheckoutState }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_margin',
		method : 'POST',
	}, { manual: true });

	const updateCheckoutMargin = async ({ finalPayload }) => {
		try {
			await trigger({ data: finalPayload });

			await getCheckout();

			setCheckoutState('preview_booking');
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	};

	return {
		updateCheckoutMargin,
		loading,
	};
};

export default useUpdateCheckoutMargin;
