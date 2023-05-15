import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationDocumentInventory = () => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_document_inventory',
		params : {
			filters    : restFilters,
			page,
			page_limit : 10,
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				setApiData(res?.data || {});
			} catch (err) {
				setApiData({});

				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		data: apiData, apiTrigger, loading, setFilters, filters,
	};
};

export default useListOrganizationDocumentInventory;
