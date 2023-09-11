import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState, useContext, useRef } from 'react';

import CostBookingDeskContext from '../context/CostBookingDeskContext';
import getCostBookingFilters from '../helpers/getCostBookingFilters';

const TIME_INTERVAL = 600;
const INIT_PAGE = 1;
const PAGE_LIMIT = 10;

function useListCostBookingDeskShipments() {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};
	const costBookingContextValues = useContext(CostBookingDeskContext);

	const {
		filters = {}, setFilters = () => {}, shipmentType = '',
		stepperTab = '', activeTab = '', paymentActiveTab = '',
	} = costBookingContextValues || {};

	const { page = INIT_PAGE, ...restFilters } = filters || {};

	const debounceQuery = useRef({ q: filters.q });

	const [apiData, setApiData] = useState('');

	const apiPrefix = ['import', 'export'].includes(stepperTab) ? shipmentType : stepperTab;

	const [{ loading }, trigger] = useRequest({
		url    : `${apiPrefix}/list_cost_booking_desk_shipments`,
		method : 'GET',
		params : {
			filters: {
				...getCostBookingFilters({ filters: restFilters, costBookingContextValues }),
				...(selected_agent_id ? { costbooking_ops_id: selected_agent_id } : {}),
			},
			additional_methods : ['pagination'],
			page,
			page_limit         : PAGE_LIMIT,
			sort_by            : 'serial_id',
			sort_type          : 'desc',
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			if (isEmpty(res?.data?.list) && page > INIT_PAGE) setFilters({ ...filters, page: INIT_PAGE });
			setApiData(res?.data);
		} catch (err) {
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
			debounceQuery.current.timerId = setTimeout(apiTrigger, TIME_INTERVAL);
		} else {
			apiTrigger();
		}

		localStorage.setItem('cost_booking_desk_values', JSON.stringify({
			filters,
			activeTab,
			scopeFilters: newScopeFilters,
			stepperTab,
			shipmentType,
			paymentActiveTab,
		}));
	}, [apiTrigger, filters, activeTab, authParams, selected_agent_id, stepperTab, shipmentType, paymentActiveTab]);

	return {
		loading,
		apiTrigger,
		data: apiData,
	};
}
export default useListCostBookingDeskShipments;
