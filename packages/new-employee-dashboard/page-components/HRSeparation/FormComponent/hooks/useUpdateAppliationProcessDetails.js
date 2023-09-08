import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateAppliationProcessDetails = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_appliation_process_details',
	}, { manual: true });

	const updateApplication = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});

			// refetch(); 		// TODOs
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateApplication,
	};
};

export default useUpdateAppliationProcessDetails;
