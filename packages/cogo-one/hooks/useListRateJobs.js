import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import { SOURCE_OPTIONS } from '../constants/rateRevertsConstants';

const getPayload = ({ params }) => ({
	all_jobs_required : false,
	stats_required    : true,
	service           : params?.service || 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source : params?.source || Object.keys(SOURCE_OPTIONS),
		status : 'pending',
	},
});

const useListRateJobs = () => {
	const [params, setParams] = useState({ source: ['live_booking'], service: 'fcl_freight' });

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_smt_rate_jobs',
		method : 'get',
	}, { manual: true });

	const fetchRateJobs = useCallback(
		async () => {
			try {
				await trigger({
					params: getPayload({ params }),
				});
			} catch (error) {
				console.error('error:', error);
			}
		},
		[params, trigger],
	);

	useEffect(() => {
		fetchRateJobs({});
	}, [fetchRateJobs]);

	return {
		loading,
		fetchRateJobs,
		rateJobsData: data,
		setParams,
		params,
	};
};

export default useListRateJobs;
