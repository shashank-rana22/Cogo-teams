import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const 	useUpdateEmployee = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_employee_directory',
	}, { manual: true });

	const updateEmployeeDetails = async ({ payload }) => {
		try {
			await trigger({
				education_details: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
};

export default useUpdateEmployee;
