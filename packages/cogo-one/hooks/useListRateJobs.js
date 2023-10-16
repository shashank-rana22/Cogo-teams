import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_RATE_JOBS_FILTERS } from '../constants/rateRevertsConstants';

const getPayload = ({ params, userId, triggeredFrom }) => ({
	all_jobs_required : true,
	stats_required    : true,
	service           : params?.service || 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source              : params?.source || undefined,
		status              : 'pending',
		service_provider_id : (triggeredFrom === 'sideBar' && userId) ? userId : undefined,
	},
});

const useListRateJobs = ({
	userId = '',
	triggeredFrom = '',
} = {}) => {
	const [params, setParams] = useState(DEFAULT_RATE_JOBS_FILTERS);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_smt_rate_jobs',
		method : 'get',
	}, { manual: true });

	const fetchRateJobs = useCallback(
		async () => {
			if (triggeredFrom === 'sideBar' && !userId) {
				return;
			}

			try {
				await trigger({
					params: getPayload({ params, userId, triggeredFrom }),
				});
			} catch (error) {
				console.error('error:', error);
			}
		},
		[params, trigger, triggeredFrom, userId],
	);

	useEffect(() => {
		fetchRateJobs();
	}, [fetchRateJobs]);

	return {
		loading,
		fetchRateJobs,
		rateJobsData: (triggeredFrom === 'sideBar' && !userId) ? {} : data,
		setParams,
		params,
	};
};

export default useListRateJobs;
