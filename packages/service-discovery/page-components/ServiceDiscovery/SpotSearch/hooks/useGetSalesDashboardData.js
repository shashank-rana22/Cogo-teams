import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import CC from '../utils/condition-constants';
import getSalesDashboardListParams from '../utils/getSalesDashboardListParams';
import getSalesDashboardListStats from '../utils/getSalesDashboardListStats';

// import useAutoRefresh from './useAutoRefresh';
import useGetPermission from './useGetPermission';

const getKeyName = ({ type, serviceType }) => {
	const mapping = {
		most_searched   : { search_type: serviceType || undefined },
		most_booked     : { search_type: serviceType || undefined },
		spot_searches   : { search_type: serviceType || undefined },
		sales_shipments : { shipment_type: serviceType || undefined },
		spot_booking    : { primary_service: serviceType || undefined },
		quotations      : { primary_service: serviceType || undefined },
	};

	return mapping[type] || null;
};

const useGetSalesDashboardData = ({
	serviceType = '',
	isRateList = false,
	api = '',
	stats = [],
	importer_exporter_id,
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
		activeStat : stats?.[0] || {},
	});
	const [extraParams, setExtraParams] = useState(rest?.extraParams || {});
	const [bucketParams, setBucketParams] = useState({});

	// const { lastRefresh } = useAutoRefresh();

	let newApi = !isRateList
		? api
		: [rest?.apiPrefix, serviceType, rest?.apiSuffix].join('_');

	if (serviceType === 'fcl_freight_local' && isRateList) {
		newApi = 'list_fcl_freight_rate_local_requests';
	}

	const [{ loading, data }, trigger] = useRequest({
		url    : newApi,
		method : 'get',
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
							// ...createdByFilter,
							...getKeyName({ type: rest.type, serviceType }),
						},
						{
							...(extraParams || {}),
							...(bucketParams || {}),
							customer_details_required:
								isRateList && serviceType === 'air_freight' ? true : undefined,
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
		page,
		activeStat,
		// lastRefresh,
		extraParams,
		serviceType,
		importer_exporter_id,
		initialPath,
		pathname,
		filters,
	]);

	useEffect(() => {
		setFilters({
			page       : 1,
			activeStat : stats.find((stat) => stat.is_default) || stats[0] || {},
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
