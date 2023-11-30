import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import { defaultRateJobFilters, ADMIN_VIEW_REQUIRED_FOR } from '../constants/rateRevertsConstants';

const DEFAULT_PAGE = 1;

const getPayload = ({ params, orgId, triggeredFrom, viewType, query }) => ({
	all_jobs_required : ADMIN_VIEW_REQUIRED_FOR.includes(viewType) ? params?.relevant_to === 'all' : false,
	stats_required    : triggeredFrom !== 'sideBar',
	service           : params?.service || 'fcl_freight',
	page_limit        : 6,
	page              : params?.page || 1,
	filters           : {
		source              : params?.source || undefined,
		status              : triggeredFrom !== 'sideBar' ? 'pending' : undefined,
		service_provider_id : (triggeredFrom === 'sideBar' && orgId) ? orgId : params?.service_provider_id || undefined,
		source_serial_id    : params?.shipment_serial_id || undefined,
		serial_id           : query || undefined,
		start_date          : (params?.dateRange?.startDate || new Date()).toISOString(),
		end_date            : (params?.dateRange?.endDate || new Date()).toISOString(),
	},
});

const useListRateJobs = ({
	orgId = '',
	triggeredFrom = '',
	viewType = '',
} = {}) => {
	const [params, setParams] = useState(() => defaultRateJobFilters({ viewType }));
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

	useEffect(() => {
		setParams((p) => ({ ...p, page: DEFAULT_PAGE }));
	}, [query]);

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
