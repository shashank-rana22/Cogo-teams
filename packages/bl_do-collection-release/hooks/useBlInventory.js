import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useBlInventory = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState(defaultFilters);

	const { page = 1, ...restFilters } = filters || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_bl_inventory',
		params : {
			filters    : restFilters,
			...defaultParams,
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
		data: apiData, apiTrigger, loading, filters, setFilters,
	};
};

export default useBlInventory;
