import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const API_END_POINT_MAPPING = {
	fcl_freight : 'get_fcl_freight_rate_job_stats',
	air_freight : 'get_air_freight_rate_job_stats',
	fcl_customs : 'get_fcl_customs_rate_job_stats',
	haulage     : 'get_haulage_freight_rate_job_stats',
	lcl_freight : 'get_lcl_freight_rate_job_stats',
	lcl_customs : 'get_lcl_customs_rate_job_stats',
	air_customs : 'get_air_customs_rate_job_stats',
	trailer     : 'get_trailer_freight_rate_job_stats',
	ltl_freight : 'get_ltl_freight_rate_job_stats',
	ftl_freight : 'get_ftl_freight_rate_job_stats',
	fcl_cfs     : 'get_fcl_cfs_rate_job_stats',
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

const useGetCoverageStats = (filter) => {
	const service = filter?.service;
	const endPoint = API_END_POINT_MAPPING[service] || 'get_fcl_freight_rate_job_stats';

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || [],
	}));

	const { user: { id: user_id = '' } = {} } = user_data;

	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });
	const getStats = useCallback(async () => {
		const { assign_to_id, releventToMeValue, daily_stats, start_date, end_date, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		const paramsMapping = ['air_freight', 'air_customs']?.includes(filter?.service)
			? AIR_PARAMS_MAPPING : FCL_PARAMS_MAPPING;

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

		let is_flash_booking_reverted;
		if (filter?.is_flash_booking_reverted) {
			is_flash_booking_reverted = filter?.is_flash_booking_reverted === 'reverted';
		}

		try {
			await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						user_id        : releventToMeValue ? user_id : FINAL_FILTERS.user_id,
						cogo_entity_id : filter?.cogo_entity_id === 'cogo_entity_id'
							? user_data?.partner?.id : undefined,
						daily_stats,
						is_flash_booking_reverted,
						weekly_stats            : !daily_stats,
						...DATE_PARAMS,
						transport_modes_keyword : filter?.service === 'trailer' ? 'trailer' : undefined,
					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [filter, trigger, user_id, user_data?.partner?.id]);

	useEffect(() => {
		getStats();
	}, [getStats, filter]);

	return {
		loading,
		data,
		getStats,
	};
};
export default useGetCoverageStats;
