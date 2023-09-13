import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const API_NAME = {
	fcl_freight : 'list_fcl_freight_rate_jobs',
	air_freight : 'list_air_freight_rate_jobs',
};

const FCL_PARAMS_MAPPING = {
	origin_location      : 'origin_port_id',
	destination_location : 'destination_port_id',
	operater_type        : 'shipping_line_id',

};

const AIR_PARAMS_MAPPING = {
	origin_location      : 'origin_airport_id',
	destination_location : 'destination_airport_id',
	operater_type        : 'airline_id',

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
		assign_to_id      : '',
	});

	const [source, setSource] = useState(null);
	const [page, setPage] = useState(DEFAULT_PAGE);

	const endPoint = API_NAME[filter?.service || 'fcl_freight'];
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getListCoverage = useCallback(async (sid) => {
		const { assign_to_id, releventToMeValue, daily_stats, start_date, end_date, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		const paramsMapping = filter?.service === 'air_freight' ? AIR_PARAMS_MAPPING : FCL_PARAMS_MAPPING;

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				if (ele in paramsMapping) {
					FINAL_FILTERS[paramsMapping[ele]] = restFilters[ele];
				} else {
					FINAL_FILTERS[ele] = restFilters[ele];
				}
			}
		});

		try {
			await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						serial_id  : sid ? parseInt(sid, 10) : undefined,
						source     : source || undefined,
						user_id    : releventToMeValue ? user_id : FINAL_FILTERS?.user_id,
						start_date : filter?.start_date,
						end_date   : filter?.end_date,
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
