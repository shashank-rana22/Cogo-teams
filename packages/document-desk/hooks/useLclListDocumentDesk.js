import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';

import DocumentDeskContext from '../context/DocumentDeskContext';
import getDocumentDeskFilters from '../helpers/LCL/getDocumentDeskFilters';

const useLclListDocumentDesk = () => {
	const documentDeskContextValues = useContext(DocumentDeskContext);

	const { filters, setFilters, activeTab, stepperTab, shipmentType } = documentDeskContextValues || {};
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const { page = 1, ...restFilters } = filters || {};

	const debounceQuery = useRef({ q: filters.q });

	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipments',
		params : {
			filters: {
				...getDocumentDeskFilters({ filters: restFilters, documentDeskContextValues }),
				...(selected_agent_id ? { stakeholder_id: selected_agent_id } : {}),
				shipment_type: stepperTab === 'lcl_customs' ? 'lcl_customs' : 'lcl_freight',
			},

			page,
			page_limit: 10,
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

		localStorage.setItem('document_desk_values', JSON.stringify({
			filters,
			activeTab,
			scopeFilters: newScopeFilters,
			stepperTab,
			shipmentType,
		}));
	}, [apiTrigger, filters, activeTab, authParams, selected_agent_id, stepperTab, shipmentType]);

	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};

export default useLclListDocumentDesk;
