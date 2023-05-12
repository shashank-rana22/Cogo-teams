import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback, useContext, useRef } from 'react';

import KamDeskContext from '../context/KamDeskContext';
import getKamDeskFilters from '../helpers/getKamDeskFilters';

const useListKamDeskShipments = () => {
	const [apiData, setApiData] = useState({});

	const kamDeskContextValues = useContext(KamDeskContext);

	const { activeTab, filters, setFilters, stepperTab, shipmentType } = kamDeskContextValues || {};

	const { page = 1, ...restFilters } = filters || {};

	const debounceQuery = useRef({ q: filters.q });

	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const apiPrefix = ['import', 'export'].includes(stepperTab) ? shipmentType : stepperTab;

	const [{ loading }, trigger] = useRequest({
		url    : `${apiPrefix}/list_kam_desk_shipments`,
		method : 'GET',
		params : {
			...getKamDeskFilters({ filters: restFilters, kamDeskContextValues }),
			page,
			page_limit : 10,
			sort_by    : 'serial_id',
			sort_type  : 'desc',
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				if (res?.data?.list === 0 && filters.page > 1) setFilters({ ...filters, page: 1 });
				setApiData(res?.data || {});
			} catch (err) {
				setApiData({});
				Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
			}
		})();
	}, [trigger, setFilters, filters]);

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

		localStorage.setItem('kam_desk_values', JSON.stringify({
			filters,
			activeTab,
			shipmentType,
			stepperTab,
			scopeFilters: newScopeFilters,
		}));
	}, [apiTrigger, activeTab, filters, shipmentType, stepperTab, authParams, selected_agent_id]);

	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};

export default useListKamDeskShipments;
