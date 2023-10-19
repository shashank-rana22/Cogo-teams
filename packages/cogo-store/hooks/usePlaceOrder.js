import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const usePlaceOrder = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/place_order',
	}, { manual: true });

	const placeOrder = async ({ payload, total }) => {
		console.log('🚀 ~ file: usePlaceOrder.js:12 ~ placeOrder ~ total:', total);
		try {
			await trigger({
				data: {
					order_items  : payload,
					total_amount : total,
				},
			});
			Toast.success('Order Successfully Placed!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		placeOrder,
		data,
	};
};

export default usePlaceOrder;
