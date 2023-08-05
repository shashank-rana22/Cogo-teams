import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useAssignSubscription({ selectedAddress = {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_subscription',
		method : 'post',
	}, { manual: true });

	const assignSubscription = async () => {
		try {
			await trigger({
				data: { ...selectedAddress },
			});
			Toast.success('Successfully assigned');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		assignSubscription,
		loading,
	};
}
export default useAssignSubscription;
