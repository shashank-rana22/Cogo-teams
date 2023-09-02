import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useRejectAction = () => {
	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/update_employee_detail',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeStatus = async (id, employee_status, fetch) => {
		const payload = {
			id,
			employee_status: employee_status === 'offered' ? 'rejected' : 'offered',
		};
		try {
			await trigger({
				data: payload,
			});
			fetch();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		updateEmployeeStatus,
		trigger,
	};
};

export default useRejectAction;
