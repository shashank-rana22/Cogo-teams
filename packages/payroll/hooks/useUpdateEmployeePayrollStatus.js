import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateEmployeePayrollStatus = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_employee_payroll_status',
	}, { manual: true });

	const updatePayrollStatus = async ({ payload, refetch }) => {
		try {
			await trigger({
				data: payload,
			});
			refetch();
			Toast.success('Successfully updated Payroll Status');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updatePayrollStatus,
	};
};

export default useUpdateEmployeePayrollStatus;
