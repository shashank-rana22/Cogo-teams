import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

import getDefaultFeedbackMonth from '../../../../../../utils/getDefaultYearMonth';

const useGetLogStats = () => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();

	const [statsParams, setStatsParams] = useState({
		Year  : feedbackYear,
		Month : feedbackMonth,
	});

	const [{ loading = false, data = {} }] = useIrisRequest({
		url    : 'get_iris_get_log_stats',
		method : 'get',
		params : statsParams,
	}, { manual: false });

	return { setStatsParams, logStatsLoading: loading, statsData: data, statsParams };
};
export default useGetLogStats;
