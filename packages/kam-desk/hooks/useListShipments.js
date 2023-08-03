import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback, useContext, useRef } from 'react';

import KamDeskContext from '../context/KamDeskContext';
import getShipmentFilters from '../helpers/getShipmentFilters';

const CHECK_PAGE = 1;
const TIMEOUT_VALUE = 600;

const useListShipments = () => {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};
	const kamDeskContextValues = useContext(KamDeskContext);

	const [apiData, setApiData] = useState({});

	const { activeTab, filters = {}, setFilters, stepperTab, shipmentType } = kamDeskContextValues || {};
	const { page = 1, ...restFilters } = filters || {};

	const debounceQuery = useRef({ q: filters.q });

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'GET',
		params : {
			...getShipmentFilters({ filters: restFilters, kamDeskContextValues }),
			page,
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				if (isEmpty(res?.data?.list) && filters.page > CHECK_PAGE) setFilters({ ...filters, page: 1 });

				setApiData(res?.data || {});
			} catch (err) {
				setApiData({});
				const message = err?.response?.data?.message || err?.message || 'Something went wrong !!';
				if (message !== 'canceled') { Toast.error(message); }
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
			debounceQuery.current.timerId = setTimeout(apiTrigger, TIMEOUT_VALUE);
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

export default useListShipments;
