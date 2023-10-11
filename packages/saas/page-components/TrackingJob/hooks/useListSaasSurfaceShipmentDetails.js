import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utlis/toastApiError';

const useListSaasSurfaceShipmentDetails = () => {
	const [params, setParams] = useState({ page: 1, sort_by: 'updated_at', sort_type: 'desc' });
	const [searchString, setSearchString] = useState('');
	const [serialId, setSerialId] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();
	const { query:serialIdQuery = '', debounceQuery:serialDebounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_surface_shipment_details',
		params : {
			filters: {
				serial_id    : serialIdQuery || undefined,
				truck_number : query || undefined,
			},
			...params,
		},
	}, { manual: true });

	const refetch = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => debounceQuery(searchString), [searchString, debounceQuery]);

	useEffect(() => serialDebounceQuery(serialId), [serialId, serialDebounceQuery]);

	useEffect(() => {
		refetch();
	}, [refetch, params, query, serialIdQuery]);

	return {
		data,
		filters    : params,
		setFilters : setParams,
		loading,
		searchString,
		setSearchString,
		serialId,
		setSerialId,
		refetch,
	};
};

export default useListSaasSurfaceShipmentDetails;
