import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getLastMileAddtionalMethods from '../helpers/getLastMileAddtionalMethods';
import getLastMileFilters from '../helpers/getLastMileFilters';

const useListLastMileDeskShipments = ({ stateProps = {} }) => {
	const { filters, activeTab, setFilters, scopeFilters } = stateProps || {};

	const [apiData, setApiData] = useState({});

	const { page = 1, ...restFilters } = filters || {};

	const formattedFilters = getLastMileFilters({ filters: restFilters, stateProps });

	const additional_methods = getLastMileAddtionalMethods({ activeTab });

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_lastmile_desk_shipments',
		params : {
			filters    : { ...formattedFilters },
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
		apiTrigger();
		localStorage.setItem('last_mile_desk_values', JSON.stringify({ filters, activeTab, scopeFilters }));
	}, [apiTrigger, filters, activeTab, scopeFilters]);

	return {
		loading, apiTrigger, data: apiData,
	};
};

export default useListLastMileDeskShipments;
