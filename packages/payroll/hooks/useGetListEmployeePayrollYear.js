import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetListPayrollYear = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_payslip_year',
	}, { manual: true });

	const getListPayrollYear = useCallback(
		async () => {
			await trigger({
				params: {
					payroll_date: 'true',
				},
			});
		},
		[trigger],
	);

	useEffect(() => {
		getListPayrollYear();
	}, [getListPayrollYear]);

	return { loading, data, refetch: getListPayrollYear };
};

export default useGetListPayrollYear;
