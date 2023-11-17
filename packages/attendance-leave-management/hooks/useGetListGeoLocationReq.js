import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetListGeoLocationReq = () => {
	const [filters, setFilters] = useState({
		page_limit : 4,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_geo_location_requests',
	}, { manual: true });

	const getListGeoLocationReq = useCallback(
		() => {
			const { page_limit, page } = filters;
			trigger({
				params: {
					filters: { q: query },
					page_limit,
					page,
				},
			});
		},
		[trigger, query, filters],
	);

	useEffect(() => {
		try {
			getListGeoLocationReq();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getListGeoLocationReq]);

	return { loading, data, query, debounceQuery, setFilters, filters, getListGeoLocationReq };
};

export default useGetListGeoLocationReq;
