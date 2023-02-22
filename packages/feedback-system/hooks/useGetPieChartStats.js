import { useRequest } from '@cogoport/request';

const useGetPieChartStats = ({ userId = '' }) => {
	const params = {
		PerformedByID : userId || undefined,
		// Month         : '3',
		Year          : '2023',
	};

	const [{ loading = false, data : userData = {} }] = useRequest({
		method : 'get',
		url    : 'get-performance-stats',
		params,
	}, { manual: false });

	return {
		loading,
		userData,
	};
};

export default useGetPieChartStats;
