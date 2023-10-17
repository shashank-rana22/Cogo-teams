import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_RATE_JOBS_FILTERS } from '../constants/rateRevertsConstants';

const ADMIN_VIEW_REQUIRED_FOR = ['cogoone_admin', 'supply_admin'];

const getPayload = ({ params, orgId, triggeredFrom, viewType }) => ({
	all_jobs_required : ADMIN_VIEW_REQUIRED_FOR.includes(viewType),
	stats_required    : triggeredFrom !== 'sideBar',
	service           : params?.service || 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source              : params?.source || undefined,
		status              : 'pending',
		service_provider_id : (triggeredFrom === 'sideBar' && orgId) ? orgId : undefined,
	},
});

const useListRateJobs = ({
	orgId = '',
	triggeredFrom = '',
	viewType = '',
} = {}) => {
	const [params, setParams] = useState(DEFAULT_RATE_JOBS_FILTERS);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_smt_rate_jobs',
		method : 'get',
	}, { manual: true });

	const fetchRateJobs = useCallback(
		async () => {
			if (triggeredFrom === 'sideBar' && !orgId) {
				return;
			}

			try {
				await trigger({
					params: getPayload({ params, orgId, triggeredFrom, viewType }),
				});
			} catch (error) {
				console.error('error:', error);
			}
		},
		[triggeredFrom, orgId, trigger, params, viewType],
	);

	useEffect(() => {
		fetchRateJobs();
	}, [fetchRateJobs]);

	return {
		loading,
		fetchRateJobs,
		rateJobsData: (triggeredFrom === 'sideBar' && !orgId) ? {} : data,
		setParams,
		params,
	};
};

export default useListRateJobs;
