import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useListFclFreightCommodityClusters = ({ defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});
	const [q, setQ] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_fcl_freight_commodity_clusters',
		params : {
			filters: {
				...restFilters,
				...defaultFilters,
				q: query,
			},
			page,
			page_limit: 10,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		debounceQuery(q);
	}, [q, debounceQuery]);

	useEffect(() => {
		setFilters((prev) => ({ ...prev, page: 1 }));
	}, [query]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters, query]);

	return {
		loading,
		data    : apiData,
		refetch : apiTrigger,
		setFilters,
		filters,
		setQ,
		q,
	};
};

export default useListFclFreightCommodityClusters;
