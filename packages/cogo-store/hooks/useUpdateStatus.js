import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateStatus = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_order_details',
	}, { manual: true });

	const updateStatus = async ({ payload }) => {
		console.log('🚀 ~ file: useUpdateStatus.js:12 ~ updateStatus ~ payload:', payload);
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Order Status Changed');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
		refetch();
	};

	return {
		loading,
		updateStatus,
	};
};

export default useUpdateStatus;
