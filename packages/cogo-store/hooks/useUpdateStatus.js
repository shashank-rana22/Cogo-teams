import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const 	useUpdateStatus = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_order_details',
	}, { manual: true });

	const updateStatus = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Order Status Changed');
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateStatus,
	};
};

export default useUpdateStatus;
