import { useHarbourRequest } from '@cogoport/request';

const useGetNextPayrollMonth = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_next_payroll_cycle',
	}, { manual: false });

	return { loading, data };
};

export default useGetNextPayrollMonth;
