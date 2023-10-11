import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { SOURCE_OPTIONS } from '../constants/rateRevertsConstants';

const getPayload = ({ params }) => ({
	all_jobs_required : false,
	stats_required    : true,
	service           : 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source: isEmpty(params?.source)
			? Object.keys(SOURCE_OPTIONS)
			: params?.source || undefined,
		status: 'pending',
	},
});

const useListRateJobs = () => {
	const [params, setParams] = useState(null);

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
