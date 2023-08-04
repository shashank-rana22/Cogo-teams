import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeStats = () => {
	const [{ loading, data = {} }, refetch] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_stats',
	}, { manual: false });

	return { data, loading, statsRefetch: refetch };
};

export default useGetEmployeeStats;
