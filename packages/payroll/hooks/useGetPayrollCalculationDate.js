import { useHarbourRequest } from '@cogoport/request';

const useGetPayrollCalculationDate = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_payroll_calculation_date',
	}, { manual: false });

	return { loading, data };
};

export default useGetPayrollCalculationDate;
