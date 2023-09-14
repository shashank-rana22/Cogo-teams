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
			await trigger({ data: payload });
		} catch (error) {
			if (error?.response?.data) Toast.error(getApiErrorString(error?.response?.data));
			else console.log(error);
		}
	};

	return { loading, postAdminData };
};

export default useUpdateAdminClearanceData;
