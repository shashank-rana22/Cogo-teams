import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateSalaryDetails = ({ refetch = () => {}, getCalculatedTax = () => {} }) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : 'update_employee_salary_details',
	}, { manual: true });

	const postEmployeeSalaryDetails = useCallback(
		async (datasent) => {
			try {
				await trigger({
					params: {
						employee_id             : 'dfca5d91-8906-d146-2970-202eace33a66',
						base_ctc                : datasent?.base,
						salary_configuration_id : datasent?.salaryConfig,
						regime_id               : datasent?.taxRegime,
					},
				});
				refetch();
				getCalculatedTax();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[getCalculatedTax, refetch, trigger],
	);

	return {
		loading,
		data,
		postEmployeeSalaryDetails,
	};
};

export default useUpdateSalaryDetails;
