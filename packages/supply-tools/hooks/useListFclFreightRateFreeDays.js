import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import removeObjEmptyValue from '../helpers/removeObjEmptyValue';

const useListFclFreightRateFreeDays = ({ activeTab = '', isApiTrigger = true }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_fcl_freight_rate_free_days',
		params : {
			filters: {
				active   : activeTab === 'active' ? true : undefined,
				inactive : activeTab === 'inactive' ? true : undefined,
				...(removeObjEmptyValue(restFilters)),
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

			// toastApiError(err);
			console.error(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (isApiTrigger)apiTrigger();
	}, [apiTrigger, filters, activeTab, isApiTrigger]);

	return {
		loading,
		data    : apiData,
		refetch : apiTrigger,
		setFilters,
		filters,
	};
};

export default useListFclFreightRateFreeDays;
