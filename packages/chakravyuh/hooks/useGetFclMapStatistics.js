import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { LOCATION_KEYS } from '../constants/map_constants';

const START_PAGE = 1;
const useGetFclMapStatistics = ({ locationFilters }) => {
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
				id   : locationFilters[key].id,
				type : locationFilters[key].type === 'seaport' ? 'port' : locationFilters[key].type,
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
		setPage(START_PAGE);
		getStats({ filters, page: 1 });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency, getStats]);

	useEffect(() => {
		if (page > START_PAGE) {
			getStats({ filters, page });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, getStats]);

	useEffect(() => {
		if (page === START_PAGE && isEmpty(data?.list)) {
			setActiveList([]);
		}
	}, [data, page]);

	return { data, loading, page, setPage, activeList, setActiveList, accuracyMapping };
};

export default useGetFclMapStatistics;
