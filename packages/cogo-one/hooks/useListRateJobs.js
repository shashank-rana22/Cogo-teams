import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const getPayload = ({ params }) => ({
	all_jobs_required : false,
	stats_required    : true,
	service           : params?.service || 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source : params?.source || 'live_booking',
		status : 'pending',
	},
});

const useListRateJobs = () => {
	const [params, setParams] = useState({ source: 'live_booking', service: 'fcl_freight' });

	const [{ loading: rateJobsLoading, data }, trigger] = useRequest({
		url    : '/list_rate_jobs',
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
		rateJobsLoading,
		fetchRateJobs,
		rateJobsData: data,
		setParams,
		params,
	};
};

export default useListRateJobs;
