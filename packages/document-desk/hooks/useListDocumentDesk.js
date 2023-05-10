import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';

import DocumentDeskContext from '../context/DocumentDeskContext';
import getDocumentDeskAdditionalMethods from '../helpers/getDocumentDeskAdditionalMethods';
import getDocumentDeskFilters from '../helpers/getDocumentDeskFilters';

const useListDocumentDesk = () => {
	const documentDeskContextValues = useContext(DocumentDeskContext);

	const { filters, setFilters, activeTab, stepperTab } = documentDeskContextValues || {};
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	const { page = 1, ...restFilters } = filters || {};

	const debounceQuery = useRef({ q: filters.q });

	const [apiData, setApiData] = useState({});

	const prefix = ['fcl_customs', 'fcl_local']?.includes(stepperTab) ? stepperTab : 'fcl_freight';

	const additional_methods = getDocumentDeskAdditionalMethods({ documentDeskContextValues });

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_document_desk_shipments`,
		params : {
			filters: {
				...getDocumentDeskFilters({ filters: restFilters, documentDeskContextValues }),
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
