import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCheckout = ({ getCheckout }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_checkout',
	}, { manual: true });

	const updateCheckout = async ({ values, closeFunction, stateValue = false }) => {
		try {
			await trigger({ data: values });

			await getCheckout();

			if (closeFunction) {
				closeFunction(stateValue);
			}
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		updateCheckout,
		updateLoading: loading,
	};
};

export default useUpdateCheckout;
