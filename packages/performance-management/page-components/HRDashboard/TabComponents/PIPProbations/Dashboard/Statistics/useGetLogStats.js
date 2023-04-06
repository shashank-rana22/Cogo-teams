import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

import getDefaultFeedbackMonth from '../../../../../../utils/getDefaultYearMonth';

const useGetLogStats = (logType) => {
	const { feedbackYear } = getDefaultFeedbackMonth();

	const [statsParams, setStatsParams] = useState({
		Year    : feedbackYear,
		LogType : logType,
	});

	const validParams = {};
	Object.keys(statsParams).forEach((key) => { if (statsParams[key]) { validParams[key] = statsParams[key]; } });

	const [{ loading = false, data = [] }] = useIrisRequest({
		url    : 'get_iris_get_log_stats',
		method : 'get',
		params : { ...validParams },
	}, { manual: false });

	return { setStatsParams, logStatsLoading: loading, statsData: data, statsParams };
};
export default useGetLogStats;
