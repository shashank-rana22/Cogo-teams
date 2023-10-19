import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import { defaultRateJobFilters } from '../constants/rateRevertsConstants';

const ADMIN_VIEW_REQUIRED_FOR = ['cogoone_admin', 'supply_admin'];

const getPayload = ({ params, orgId, triggeredFrom, viewType, query }) => ({
	all_jobs_required : ADMIN_VIEW_REQUIRED_FOR.includes(viewType),
	stats_required    : triggeredFrom !== 'sideBar',
	service           : params?.service || 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source              : params?.source || undefined,
		status              : triggeredFrom !== 'sideBar' ? 'pending' : undefined,
		service_provider_id : (triggeredFrom === 'sideBar' && orgId) ? orgId : undefined,
		shipment_id         : params?.shipment_id || undefined,
		serial_id           : query || undefined,
		// start_date          : params?.dateRange?.startDate || new Date(),
		// end_date            : params?.dateRange?.endDate || new Date(),
	},
});

const useListRateJobs = ({
	orgId = '',
	triggeredFrom = '',
	viewType = '',
} = {}) => {
	const [params, setParams] = useState(() => defaultRateJobFilters());
	const [searchQuery, setSearchQuery] = useState('');

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_smt_rate_jobs',
		method : 'get',
	}, { manual: true });

	const { debounceQuery, query } = useDebounceQuery();

	const fetchRateJobs = useCallback(
		async () => {
			if (triggeredFrom === 'sideBar' && !orgId) {
				return;
			}

			try {
				await trigger({
					params: getPayload({ params, orgId, triggeredFrom, viewType, query }),
				});
			} catch (error) {
				console.error('error:', error);
			}
		},
		[triggeredFrom, orgId, trigger, params, viewType, query],
	);

	useEffect(() => {
		fetchRateJobs();
	}, [fetchRateJobs]);

	useEffect(() => {
		debounceQuery(searchQuery);
	}, [searchQuery, debounceQuery]);

	return {
		loading,
		fetchRateJobs,
		rateJobsData: (triggeredFrom === 'sideBar' && !orgId) ? {} : data,
		setParams,
		params,
		searchQuery,
		setSearchQuery,
	};
};

export default useListRateJobs;
