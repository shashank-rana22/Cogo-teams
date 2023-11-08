import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPartner = () => {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});
	const [q, setQ] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const { page = 1, ...rest } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_partners',
		method : 'GET',
		params : {
			filters: {
				...rest,
				...(selected_agent_id ? { stakeholder_id: selected_agent_id } : {}),
				q            : query,
				entity_types : ['cogoport'],
			},
			roles_data_required : true,
			page,
			page_limit          : 20,
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
	}, [apiTrigger, filters, authParams, selected_agent_id]);

	return {
		loading,
		data    : apiData,
		refetch : apiTrigger,
		setFilters,
		filters,
		q,
		setQ,
	};
};

export default useGetPartner;
