import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeStats = () => {
	const [{ loading, data = {} }] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_stats',
	}, { manual: false });

	return { data, loading };
};

export default useGetEmployeeStats;
