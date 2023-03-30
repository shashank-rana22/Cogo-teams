import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getLastMileAddtionalMethods from '../helpers/getLastMileAddtionalMethods';
import getLastMileFilters from '../helpers/getLastMileFilters';

const useListLastMileDeskShipments = ({ stateProps = {} }) => {
	const { filters, activeTab, setFilters } = stateProps || {};

	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);

	const [{ loading:apiLoading }, trigger] = useRequest('fcl_freight/list_lastmile_desk_shipments', { manual: true });

	const { page = 1, ...restFilters } = filters || {};

	const formattedFilters = getLastMileFilters({ filters: restFilters, stateProps });

	const additional_methods = getLastMileAddtionalMethods({ activeTab });

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters    : { ...formattedFilters },
					additional_methods,
					page,
					page_limit : 10,
					sort_by    : 'serial_id',
					sort_type  : 'desc',
				},
			});

			if (res?.data?.list?.length === 0 && page > 1) setFilters({ ...filters, page: 1 });

			setLoading(false);
			setApiData(res?.data || {});
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	useEffect(() => {
		apiTrigger();
		localStorage.setItem('last_mile_desk_values', JSON.stringify(stateProps));
	}, [filters, activeTab]);

	return {
		loading: loading || apiLoading, apiTrigger, data: apiData,
	};
};

export default useListLastMileDeskShipments;
