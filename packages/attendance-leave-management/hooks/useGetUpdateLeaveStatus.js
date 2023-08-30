import { Toast } from '@cogoport/components';
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
			console.log('errror', error);
		}
	};

	return { loading, updateLeaveStatus };
};

export default useUpdateLeaveStatus;
