import { useIrisRequest } from '@cogoport/request';

const useGetFeedbackPerformanceStats = ({ userId = '', params = {} }) => {
	const { Month = '', Year = '' } = params;

	const [{ data: performanceStatsList = [], loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_get_average_ratings',
		params : {
			Month  : Month || undefined,
			Year   : Year || undefined,
			UserID : userId || undefined,
		},
	}, { manual: false });

	return {
		performanceStatsList,
		loading,
	};
};

export default useGetFeedbackPerformanceStats;
