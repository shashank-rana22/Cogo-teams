import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback, useContext, useRef } from 'react';

import LastMileDeskContext from '../context/LastMileDeskContext';
import getLastMileAddtionalMethods from '../helpers/getLastMileAddtionalMethods';
import getLastMileFilters from '../helpers/getLastMileFilters';

const useListLastMileDeskShipments = () => {
	const lastMileContextValues = useContext(LastMileDeskContext);

	const { filters, setFilters, activeTab } = lastMileContextValues || {};
	const { page = 1, ...restFilters } = filters || {};

	const debounceQuery = useRef({ q: filters.q });

	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const [apiData, setApiData] = useState({});

	const additional_methods = getLastMileAddtionalMethods({ lastMileContextValues });

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_lastmile_desk_shipments',
		params : {
			filters: {
				...getLastMileFilters({ filters: restFilters, lastMileContextValues }),
				...(selected_agent_id ? { stakeholder_id: selected_agent_id } : {}),
			},
			additional_methods,
			page,
			page_limit : 10,
			sort_by    : 'serial_id',
			sort_type  : 'desc',
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			if (res?.data?.list?.length === 0 && page > 1) setFilters({ ...filters, page: 1 });

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});
			Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
		}
	}, [trigger, setFilters, page, filters]);

	useEffect(() => {
		const [, scope, view_type] = (authParams || '').split(':');

		if (!scope) { return; }

		const newScopeFilters = { scope, view_type, selected_agent_id };

		if (debounceQuery.current.q !== filters.q) {
			clearTimeout(debounceQuery.current.timerId);

			debounceQuery.current.q = filters.q;
			debounceQuery.current.timerId = setTimeout(apiTrigger, 600);
		} else {
			apiTrigger();
		}

		localStorage.setItem('last_mile_desk_values', JSON.stringify({
			filters,
			activeTab,
			scopeFilters: newScopeFilters,
		}));
	}, [apiTrigger, filters, activeTab, authParams, selected_agent_id]);

	return {
		loading,
		apiTrigger,
		data: apiData,
	};
};

export default useListLastMileDeskShipments;
