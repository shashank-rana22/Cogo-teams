import { useIrisRequest } from '@cogoport/request';

const useGetPieChartStats = ({ userId = '', params = {} }) => {
	const { Month = '', Year = '' } = params;

	const newParams = {
		UserID : userId || undefined,
		Month  : Month || undefined,
		Year   : Year || undefined,
	};

	const [{ loading = false, data : userData = {} }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_get_performance_stats',
		params : newParams,
	}, { manual: false });

	return {
		loading,
		userData,
	};
};

export default useGetPieChartStats;
