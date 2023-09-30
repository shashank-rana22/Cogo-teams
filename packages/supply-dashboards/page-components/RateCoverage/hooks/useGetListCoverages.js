import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const API_NAME = {
	fcl_freight     : 'list_fcl_freight_rate_jobs',
	lcl_freight     : 'list_lcl_freight_rate_jobs',
	lcl_customs     : 'list_lcl_customs_rate_jobs',
	air_customs     : 'list_air_customs_rate_jobs',
	trailer_freight : 'list_trailer_freight_rate_jobs',
	ltl_freight     : 'list_ltl_freight_rate_jobs',
	air_freight     : 'list_air_freight_rate_jobs',
	haulage_freight : 'list_haulage_freight_rate_jobs',
	fcl_customs     : 'list_fcl_customs_rate_jobs',
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

	const [page, setPage] = useState(DEFAULT_PAGE);
	const [source, setSource] = useState('live_bookings');
	const [filter, setFilter] = useState({
		service           : 'fcl_freight',
		status            : 'pending',
		source            : '',
		releventToMeValue : true,
		daily_stats       : true,
		assign_to_id      : '',
		revert            : '',
		value             : '',
	});
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

		const isTodayDateRequired = ['pending', 'completed'].includes(filter?.status);

		const DATE_PARAMS = {};

		if (isTodayDateRequired) {
			DATE_PARAMS.start_date = new Date();
		}
		if (isTodayDateRequired) {
			DATE_PARAMS.end_date = new Date();
		}
		if (filter?.start_date) { DATE_PARAMS.start_date = filter?.start_date; }
		if (filter?.end_date) { DATE_PARAMS.end_date = filter?.end_date; }

		try {
			await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						serial_id : sid ? parseInt(sid, 10) : undefined,
						source    : source || undefined,
						user_id   : releventToMeValue ? user_id : FINAL_FILTERS?.user_id,
						...DATE_PARAMS,
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
