import { useRequest } from '@cogoport/request';

const useGetPieChartStats = ({ userId = '', month = '', year = '' }) => {
	const Months = ['January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const params = {
		PerformedByID : userId || undefined,
		Month         : Months[month - 1] || undefined,
		Year          : year || undefined,
	};

	// console.log(Months[month - 1]);

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
