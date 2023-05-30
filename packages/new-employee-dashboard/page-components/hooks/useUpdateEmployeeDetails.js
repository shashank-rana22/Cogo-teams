import { useHarbourRequest } from '@cogoport/request';

const useUpdateEmployeeDeatils = ({ id, status, getEmployeeDetails }) => {
	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/update_employee_detail',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeStatus = async () => {
		const payload = {
			performed_by_id   : '5674cb',
			performed_by_type : '2314fb',
			id,
			status            : status === 'active' ? 'inactive' : 'active',
		};
		try {
			await trigger({
				data: payload,
			});
			getEmployeeDetails(id);
		} catch (err) {
			// Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		updateEmployeeStatus,
	};
};

export default useUpdateEmployeeDeatils;
