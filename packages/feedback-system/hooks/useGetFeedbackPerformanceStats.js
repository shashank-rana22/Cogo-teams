import { useRequest } from '@cogoport/request';

const useGetFeedbackPerformanceStats = ({ user_id = '', params = {} }) => {
	const { Month = '', Year = '', ManagerID = '' } = params;

	const [{ data: performanceStatsList = [], loading = false }] = useRequest({
		method : 'get',
		url    : 'get_average_ratings',
		params : {
			Month         : Month || undefined,
			Year          : Year || undefined,
			UserID        : user_id || undefined,
			PerformedByID : ManagerID || undefined,
		},
	}, { manual: false });

	return {
		performanceStatsList,
		loading,
	};
};

export default useGetFeedbackPerformanceStats;
