import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const TRACKING_LIST_URL = {
	ocean : '/list_saas_container_subscriptions',
	air   : '/list_saas_air_subscriptions',
};

const STATS_KEY_MAPPING = {
	on_track_shipments : 'on_track_id',
	shipments_delayed  : 'shipments_delayed_id',
	attention_required : 'attention_required_id',
};

const useGetListTracker = () => {
	const { query: routerQuery } = useRouter();
	const { debounceQuery, query } = useDebounceQuery();

	const { isArchived = false, trackingType = '', partner_id } = routerQuery || {};

	const [filter, setFilter] = useState({
		inputValue  : null,
		selectValue : null,
	});

	const [globalFilter, setGlobalFilter] = useState({
		page        : 1,
		activeTab   : trackingType || 'ocean',
		q           : '',
		search_type : 'All',
	});

	const { inputValue } = filter;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : TRACKING_LIST_URL[globalFilter.activeTab],
	}, { manual: true });

	const refetchTrackerList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						...globalFilter,
						status: isArchived ? 'completed' : 'active',
						partner_id,
					},
					page       : globalFilter.page,
					page_limit : 10,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [trigger, globalFilter, isArchived, partner_id]);

	const selectValueChangeHandler = (value) => {
		const stats = data?.stats;

		const trackingId = stats?.[STATS_KEY_MAPPING[value]] || [];

		setFilter((prev) => ({ ...prev, selectValue: value }));
		setGlobalFilter((prev) => ({
			...prev,
			id: trackingId || '',
		}));
	};

	const filterChangeHandler = (name, value) => {
		setGlobalFilter((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (inputValue !== null && inputValue !== undefined) {
			debounceQuery(inputValue);
		}
	}, [debounceQuery, inputValue]);

	useEffect(() => {
		if (query !== null) {
			setGlobalFilter((prev) => ({
				...prev,
				q    : query,
				page : 1,
			}));
		}
	}, [query]);

	useEffect(() => {
		refetchTrackerList();
	}, [globalFilter, refetchTrackerList]);

	return {
		data,
		loading,
		refetchTrackerList,
		globalFilter,
		filter,
		setFilter,
		setGlobalFilter,
		filterChangeHandler,
		selectValueChangeHandler,
	};
};

export default useGetListTracker;
