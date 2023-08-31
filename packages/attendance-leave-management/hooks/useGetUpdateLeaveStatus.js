import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const DEFAULT_PAGE = 1;

const useUpdateLeaveStatus = (setFilters) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_employee_leave_request',
	}, { manual: true });

	const updateLeaveStatus = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			setFilters(DEFAULT_PAGE);
			Toast.success('Status Updated Sucessfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, updateLeaveStatus };
};

export default useUpdateLeaveStatus;
