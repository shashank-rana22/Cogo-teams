import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import FILTER_SERVICE_MAPPING from '../configurations/filter-service-mapping.json';
import CC from '../utils/condition-constants';
import getSalesDashboardListParams from '../utils/getSalesDashboardListParams';
import getSalesDashboardListStats from '../utils/getSalesDashboardListStats';

import useGetPermission from './useGetPermission';

const getKeyName = ({ type, serviceType }) => {
	const mapping = {
		most_searched   : { service_group: FILTER_SERVICE_MAPPING[serviceType] },
		most_booked     : { service_group: FILTER_SERVICE_MAPPING[serviceType] },
		spot_searches   : { search_type: serviceType || undefined },
		quotations      : { primary_service: serviceType || undefined },
		saved_for_later : { primary_service: serviceType || undefined },
	};

	return mapping[type] || null;
};

const useGetSalesDashboardData = ({
	serviceType,
	api = '',
	stats = [],
	importer_exporter_id,
	origin_location_id,
	destination_location_id,
	...rest
}) => {
	const { user_profile, pathname } = useSelector(({ general, profile }) => ({
		...general,
		user_profile: profile,
	}));

	const { isConditionMatches } = useGetPermission();

	const [initialPath] = useState(pathname);
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
		activeStat : stats?.[GLOBAL_CONSTANTS.zeroth_index] || {},
	});
	const [extraParams, setExtraParams] = useState(rest?.extraParams || {});
	const [bucketParams, setBucketParams] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : api,
		method : 'GET',
	}, { manual: true });

	const { user = {} } = user_profile;

	const { id: user_id = '' } = user;

	const showAllSpots = isConditionMatches(CC.SHOW_ALL_SPOT_BOOKING, 'or')
		|| pathname !== '/[partner_id]/service_discovery';

	const createdByFilter = !showAllSpots ? { created_by_id: user_id } : {};
	const { page, page_limit, activeStat, ...restFilters } = filters || {};

	const statsData = getSalesDashboardListStats({
		data,
		rest,
		stats,
	});

	// const keyToSend = globalViewKeys[rest.type];
	// const agentFilter = keyToSend ? { [keyToSend]: selected_agent_id } : {};

	// const timeKeysToSend = globalTimeKeys[rest.type];

	// const dateFilters = {};
	// if (timeKeysToSend) {
	// 	const initialDateFilters = {
	// 		startDate: subtractDays(new Date(), 2).setHours(0, 0, 0, 0),
	// 		endDate: new Date(),
	// 	};
	// 	dateFilters[timeKeysToSend?.startDate] = formatDateToString(
	// 		initialDateFilters?.startDate,
	// 	);
	// 	dateFilters[timeKeysToSend?.endDate] = formatDateToString(
	// 		initialDateFilters?.endDate,
	// 	);
	// }

	const getList = async () => {
		try {
			await trigger({
				params: {
					...getSalesDashboardListParams(
						rest.type,
						{
							// ...(dateFilters || {}),
							...(rest.defaultFilters || {}),
							...(restFilters || {}),
							...(activeStat?.filter || {}),
							// ...agentFilter,
							importer_exporter_id,
							origin_location_id,
							destination_location_id,
							// ...createdByFilter,
							...getKeyName({ type: rest.type, serviceType }),
						},
						{
							...(extraParams || {}),
							...(bucketParams || {}),
							page_limit,
							page,
						},
						api,
						user_id,
						user_profile,
					),
				},
			});
		} catch (err) {
			if (err.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	useEffect(() => {
		if (initialPath === pathname) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user_profile?.authorizationparameters,
		extraParams,
		serviceType,
		importer_exporter_id,
		origin_location_id,
		destination_location_id,
		initialPath,
		pathname,
		filters,
	]);

	useEffect(() => {
		if ((typeof stats === 'object' && isEmpty(stats)) || !stats) {
			return;
		}

		setFilters({
			page       : 1,
			activeStat : stats.find((stat) => stat.is_default) || stats[GLOBAL_CONSTANTS.zeroth_index] || {},
		});
	}, [stats]);

	return {
		isConditionMatches,
		loading,
		listData: data,
		statsData,
		filters,
		setFilters,
		bucketParams,
		setBucketParams,
		extraParams,
		setExtraParams,
	};
};
export default useGetSalesDashboardData;
