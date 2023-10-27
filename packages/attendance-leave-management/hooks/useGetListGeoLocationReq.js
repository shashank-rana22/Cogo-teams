import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetListGeoLocationReq = () => {
	const [filters, setFilters] = useState({
		page_limit : 20,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, geoLocationData }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_geo_location_requests',
	}, { manual: true });

	const getListGeoLocationReq = useCallback(
		() => {
			const { page_limit, page, ...rest } = filters;
			trigger();
		},
		[trigger, filters],
	);

	useEffect(() => {
		try {
			getListGeoLocationReq();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getListGeoLocationReq]);

	return { loading, geoLocationData, query, debounceQuery, setFilters, filters };
};

export default useGetListGeoLocationReq;
