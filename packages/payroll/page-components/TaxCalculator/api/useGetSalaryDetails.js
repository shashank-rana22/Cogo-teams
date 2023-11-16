import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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
						employee_id: 'dfca5d91-8906-d146-2970-202eace33a66',
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
