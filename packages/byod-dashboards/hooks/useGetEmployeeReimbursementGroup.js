import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeReimbursementGroup = (id) => {
	const [{ btnloading, data }, trigger] = useHarbourRequest({
		url    : '/get_employee_device_reimbursement_group',
		method : 'GET',
	}, { manual: true });

	const getEmployeeReimbursementGroup = async () => {
		const payload = {
			id,
		};
		try {
			await trigger({
				data: payload,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		data,
		getEmployeeReimbursementGroup,
	};
};

export default useGetEmployeeReimbursementGroup;
