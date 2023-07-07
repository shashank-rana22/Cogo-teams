import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGELIMIT = 10;
const useListOrganizationTradeParties = ({
	defaultFilters = {},
	organization_id = '',
	defaultParams = {},
	query = '',
}) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : 'list_organization_trade_parties',
		params : {
			filters: {
				organization_id,
				...defaultFilters,
				...restFilters,
				address_query: query,
			},
			page,
			page_limit: PAGELIMIT,
			...defaultParams,
		},

	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		data: apiData,
		loading,
		apiTrigger,
		filters,
		setFilters,
	};
};

export default useListOrganizationTradeParties;
