import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCancelOrder = (getOrderDetails = () => {}) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_order_details',
	}, { manual: true });

	const cancelOrder = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Order Successfully Cancelled!');
			getOrderDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		cancelOrder,
	};
};

export default useCancelOrder;
