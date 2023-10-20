import { useHarbourRequest } from '@cogoport/request';

const useGetMonthCycle = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_next_payroll_cycle',
	}, { manual: false });

	return { loading, data };
};

export default useGetMonthCycle;
