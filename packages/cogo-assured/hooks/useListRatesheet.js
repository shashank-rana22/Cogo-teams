import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useListRatesheet = ({ defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_cogo_assured_rate_sheets',
		params : {
			filters: {
				...restFilters,
				...defaultFilters,
			},
			page,
			page_limit: 10,
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
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		loading,
		data    : apiData,
		refetch : apiTrigger,
		setFilters,
		filters,
	};
};

export default useListRatesheet;
