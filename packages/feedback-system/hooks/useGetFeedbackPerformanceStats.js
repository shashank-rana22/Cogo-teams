import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetFeedbackPerformanceStats = ({ user_id = '', Month = '', Year = '', ManagerID = '' }) => {
	const [performanceFilter, setPerformanceFilter] = useState(90);

	const [{ data: performanceStatsList = [], loading = false }] = useRequest({
		method : 'get',
		url    : 'get-average-ratings',
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
		performanceFilter,
		setPerformanceFilter,
	};
};

export default useGetFeedbackPerformanceStats;
