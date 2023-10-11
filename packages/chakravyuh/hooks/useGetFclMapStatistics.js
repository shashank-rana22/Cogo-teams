import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { LOCATION_KEYS } from '../constants/map_constants';
import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const START_PAGE = 1;
const HIERARCHY_KEYS = ['port', 'airport', 'region', 'country', 'continent'];
const EXCLUDE_KEYS = LOCATION_KEYS.map((key) => [key,
	...HIERARCHY_KEYS.map((sub_key) => `${key}_${sub_key}_id`)]).flat();

const useGetFclMapStatistics = ({ locationFilters, globalFilters }) => {
	const [filterBy, setFilterBy] = useState('spot_search');
	const [page, setPage] = useState(START_PAGE);
	const [activeList, setActiveList] = useState([]);

	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_map_view_statistics',
		method : 'GET',
	}, { manual: true });

	const getStats = async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			toastApiError(err);
		}
	};

	const filters = LOCATION_KEYS.reduce((acc, key) => {
		if (locationFilters[key]?.id) {
			acc[key] = {
				id           : locationFilters[key].id,
				type         : locationFilters[key].type === 'seaport' ? 'port' : locationFilters[key].type,
				country_id   : locationFilters[key]?.country_id,
				// region_id    : locationFilters[key]?.region_id,
				continent_id : locationFilters[key]?.continent_id,
			};
		}
		return acc;
	}, {});

	const accuracyMapping = (activeList).reduce((acc, item) => {
		acc[item.destination_id] = item?.count;
		return acc;
	}, {});

	filters.select_aggregate = { count: filterBy };

	useEffect(() => {
		const { service_type } = globalFilters;
		if (service_type === 'fcl') {
			const params = getFormattedPayload({
				...globalFilters,
			}, ['start_date', 'end_date', 'chart_type', ...EXCLUDE_KEYS]);

			getStats(merge(params, {
				filters,
				page: 1,
			}));
			setPage(START_PAGE);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters), JSON.stringify(globalFilters)]);

	useEffect(() => {
		if (page > START_PAGE) {
			const params = getFormattedPayload({
				...globalFilters,
				start_date: new Date(),
			}, ['end_date', ...EXCLUDE_KEYS]);
			getStats(merge(params, { filters, page }));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return {
		data, loading, page, setPage, activeList, setActiveList, accuracyMapping, filterBy, setFilterBy,
	};
};

export default useGetFclMapStatistics;
