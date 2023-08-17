import { useRequest } from '@cogoport/request';
import { isEmpty, merge } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { LOCATION_KEYS } from '../constants/map_constants';
import getFormattedPayload from '../utils/getFormattedPayload';

const START_PAGE = 1;
const useGetFclMapStatistics = ({ locationFilters, globalFilters }) => {
	const [sort, setSort] = useState({ sort_by: 'accuracy', sort_type: 'asc' });
	const [page, setPage] = useState(START_PAGE);
	const [activeList, setActiveList] = useState([]);

	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_map_view_statistics',
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				// console.log(err);
			}
		},
		[trigger],
	);

	const filters = LOCATION_KEYS.reduce((acc, key) => {
		if (locationFilters[key]?.id) {
			acc[key] = {
				id           : locationFilters[key].id,
				type         : locationFilters[key].type === 'seaport' ? 'port' : locationFilters[key].type,
				country_id   : locationFilters[key]?.country_id,
				region_id    : locationFilters[key]?.region_id,
				continent_id : locationFilters[key]?.continent_id,
			};
		}
		return acc;
	}, {});

	const accuracyMapping = (data?.list || []).reduce((acc, item) => {
		acc[item.destination_id] = item?.accuracy;
		return acc;
	}, {});

	const dependency = Object.values(filters).map(({ id }) => id).join('_');

	useEffect(() => {
		const params = getFormattedPayload(globalFilters, ['origin', 'destination']);
		setPage(START_PAGE);
		getStats(merge(params, { filters: { ...filters, ...sort }, page: 1 }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency, globalFilters, sort, getStats]);

	useEffect(() => {
		if (page > START_PAGE) {
			getStats({ filters, sort, page });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, getStats]);

	useEffect(() => {
		if (page === START_PAGE && isEmpty(data?.list)) {
			setActiveList([]);
		}
	}, [data, page]);

	return {
		data, loading, page, setPage, activeList, setActiveList, accuracyMapping, sort, setSort,
	};
};

export default useGetFclMapStatistics;
