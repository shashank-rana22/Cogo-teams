import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateAdminClearanceData = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_application_process_details',

	}, { manual: true });

	const postAdminData = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		postAdminData,
	};
};

export default useUpdateAdminClearanceData;
