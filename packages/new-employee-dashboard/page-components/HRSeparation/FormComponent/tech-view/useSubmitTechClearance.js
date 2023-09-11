import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useSubmitTechClearance = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_appliation_process_details',

	}, { manual: true });

	const postTechData = async ({ values, sub_process_detail_id, process_name }) => {
		try {
			await trigger({
				data: {
					sub_process_data: values,
					sub_process_detail_id,
					process_name,
				},
			});

			// getApplicationProcessDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		postTechData,

	};
};

export default useSubmitTechClearance;
