import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdatePayrollCalculationDate = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_payroll_calculation_date',
	}, { manual: true });

	const updatePayrollCalculationDate = useCallback(
		async ({ payload }) => {
			try {
				await trigger({
					data: { payroll_calculation_date: payload },
				});
				Toast.success('Date updated Successfully');
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		},
		[trigger],
	);

	return { loading, data, updatePayrollCalculationDate };
};

export default useUpdatePayrollCalculationDate;
