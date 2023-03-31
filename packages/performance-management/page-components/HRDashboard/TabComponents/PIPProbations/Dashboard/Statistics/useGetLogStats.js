import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetLogStats = () => {
	const [statsParams, setStatsParams] = useState({

	});

	const [{ loading = false, data = {} }] = useIrisRequest({
		url    : 'get_iris_get_log_stats',
		method : 'get',
		params : statsParams,
	}, { manual: false });

	return { setStatsParams, logStatsLoading: loading, statsData: data };
};
export default useGetLogStats;
