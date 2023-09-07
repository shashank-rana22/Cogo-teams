import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const API_NAME = {
	fcl_freight : 'list_fcl_freight_rate_jobs',
	air_freight : 'list_air_freight_rate_jobs',
};

const DEFAULT_PAGE = 1;

const useGetListCoverage = () => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const [filter, setFilter] = useState({
		service           : 'fcl_freight',
		status            : 'pending',
		releventToMeValue : true,
		daily_stats       : true,
	});

	const [source, setSource] = useState(null);
	const [page, setPage] = useState(DEFAULT_PAGE);

	const endPoint = API_NAME[filter?.service || 'fcl_freight'];
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getListCoverage = useCallback(async (sid) => {
		const { releventToMeValue, daily_stats, start_date, end_date, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				if (ele === 'origin_port_id' && (filter?.service === 'air_freight')) {
					FINAL_FILTERS.origin_airport_id = restFilters[ele];
				} else if (ele === 'destination_port_id' && (filter?.service === 'air_freight')) {
					FINAL_FILTERS.destination_airport_id = restFilters[ele];
				} else if (ele === 'shipping_line_id' && (filter?.service === 'air_freight')) {
					FINAL_FILTERS.airline_id = restFilters[ele];
				} else FINAL_FILTERS[ele] = restFilters[ele];
			}
		});

		try {
			await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						serial_id    : sid ? parseInt(sid, 10) : undefined,
						source       : source || undefined,
						user_id      : releventToMeValue ? user_id : undefined,
						daily_stats,
						weekly_stats : !daily_stats,
						start_date   : filter?.start_date || new Date(),
						end_date     : filter?.end_date || new Date(),
					},
					page,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, user_id, filter, source, page]);

	useEffect(() => {
		getListCoverage();
	}, [getListCoverage, filter]);

	return {
		loading,
		data,
		getListCoverage,
		source,
		setSource,
		page,
		setPage,
		filter,
		setFilter,
	};
};

export default useGetListCoverage;
