import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useContext, useState, useEffect, useCallback } from 'react';

import payloadMapping from '../configs/payloadMapping';
import DashboardContext from '../context/DashboardContext';

const DEFAULT_PAGE = 1;

const useListDocumentDesk = () => {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const dashboardContextValues = useContext(DashboardContext);
	const { filters, setFilters, activeTab, stepperTab } = dashboardContextValues || {};

	const { page = 1, ...restFilters } = filters || {};

	const { startDate:from_created_at, endDate:to_created_at } = filters || {};
	const [apiData, setApiData] = useState({});
	const [{ loading }, trigger] = useRequest({

		url    : '/list_surface_so2_dashboard_shipments',
		params : {
			filters: {
				from_created_at,
				to_created_at,
				...restFilters,
				...payloadMapping[stepperTab][activeTab],
			},
			sort_by                           : filters?.sortValue,
			sort_type                         : filters?.order,
			task_stats_required               : true,
			pagination_data_required          : true,
			data_required                     : true,
			is_collection_party_data_required : true,
			pending_task_required             : true,
			service_details_required          : true,
			page,
		},
	});

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			if (isEmpty(res?.data?.list) && page > DEFAULT_PAGE) setFilters({ ...filters, page: DEFAULT_PAGE });

			setApiData(res?.data || {});
		} catch (err) {
			if (err?.message === 'canceled') return;
			setApiData({});

			Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
		}
	}, [trigger, setFilters, page, filters]);

	useEffect(() => {
		apiTrigger();
		const [, scope, view_type] = (authParams || '').split(':');
		if (!scope) { return; }

		const newScopeFilters = { scope, view_type, selected_agent_id };
		apiTrigger();
		localStorage.setItem('document_desk_values', JSON.stringify({
			filters,
			activeTab,
			scopeFilters: newScopeFilters,
			stepperTab,
		}));
	}, [apiTrigger, filters, activeTab, authParams, selected_agent_id, stepperTab]);
	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};
export default useListDocumentDesk;
