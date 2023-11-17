import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import { PARAM_MAPPING } from '../payload/jobs_and_stats_paramsMapping';

const API_NAME = {
	fcl_freight : 'list_fcl_freight_rate_jobs',
	lcl_freight : 'list_lcl_freight_rate_jobs',
	lcl_customs : 'list_lcl_customs_rate_jobs',
	air_customs : 'list_air_customs_rate_jobs',
	trailer     : 'list_trailer_freight_rate_jobs',
	ltl_freight : 'list_ltl_freight_rate_jobs',
	air_freight : 'list_air_freight_rate_jobs',
	haulage     : 'list_haulage_freight_rate_jobs',
	fcl_customs : 'list_fcl_customs_rate_jobs',
	ftl_freight : 'list_ftl_freight_rate_jobs',
	fcl_cfs     : 'list_fcl_cfs_rate_jobs',
	fcl_local   : 'list_fcl_freight_rate_local_jobs',
	air_local   : 'list_air_freight_rate_local_jobs',
};

const DEFAULT_PAGE = 1;

const useGetListCoverage = ({ userService }) => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id: user_id = '' } = {} } = user_data;

	const firstService = userService?.length > 0 ? userService?.[0] : 'fcl_freight';

	const [page, setPage] = useState(DEFAULT_PAGE);
	const [source, setSource] = useState('');
	const [filter, setFilter] = useState({
		service                   : firstService,
		status                    : 'pending',
		releventToMeValue         : true,
		daily_stats               : true,
		assign_to_id              : '',
		is_flash_booking_reverted : '',
		cogo_entity_id            : '',
		shipment_id               : '',
		trade_type                : '',
		start_date                : '',
		end_date                  : '',
	});
	const endPoint = API_NAME[filter?.service || 'fcl_freight'];

	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getListCoverage = useCallback(async (sid) => {
		const { assign_to_id, releventToMeValue, daily_stats, start_date, end_date, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		const paramsMapping = PARAM_MAPPING[filter?.service];
		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				if (ele in paramsMapping) {
					FINAL_FILTERS[paramsMapping[ele]] = restFilters[ele];
				} else {
					FINAL_FILTERS[ele] = restFilters[ele];
				}
			}
		});

		const isTodayDateRequired = filter?.status === 'completed';

		const DATE_PARAMS = {};

		const idToUse = source === 'live_booking' ? 'shipment_serial_id' : 'serial_id';

		const idValue = sid ? parseInt(sid, 10) : undefined;

		if (isTodayDateRequired) {
			DATE_PARAMS.start_date = new Date();
		}
		if (isTodayDateRequired) {
			DATE_PARAMS.end_date = new Date();
		}
		if (filter?.start_date) { DATE_PARAMS.start_date = filter?.start_date; }
		if (filter?.end_date) { DATE_PARAMS.end_date = filter?.end_date; }

		try {
			let is_flash_booking_reverted;
			if (filter?.is_flash_booking_reverted) {
				is_flash_booking_reverted = filter?.is_flash_booking_reverted === 'reverted';
			}
			await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						status         : filter?.status === 'completed' ? ['completed', 'aborted'] : filter?.status,
						[idToUse]      : idValue || undefined,
						source         : source || undefined,
						user_id        : releventToMeValue ? user_id : FINAL_FILTERS?.user_id,
						cogo_entity_id : filter?.cogo_entity_id === 'cogo_entity_id'
							? user_data?.partner?.id : undefined,
						is_flash_booking_reverted,
						...DATE_PARAMS,
						transport_modes_keyword: filter?.service === 'trailer' ? 'trailer' : undefined,
					},
					page,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [filter, trigger, source, user_id, user_data?.partner?.id, page]);

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
