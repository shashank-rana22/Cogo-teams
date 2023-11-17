import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetSalaryDetails = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : 'get_salary_configuration',
	}, { manual: true });

	const getEmployeeSalaryDetails = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						employee_id: GLOBAL_CONSTANTS.calculator.emp_id,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger],
	);

	return {
		loading,
		getdata: data,
		getEmployeeSalaryDetails,
	};
};

export default useGetSalaryDetails;
