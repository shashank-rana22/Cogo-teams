import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import getSalesDashboardListParams from '../utils/getSalesDashboardListParams';
import getSalesDashboardListStats from '../utils/getSalesDashboardListStats';

const getKeyName = ({ type, serviceType }) => {
	const mapping = {
		most_searched   : { primary_service: serviceType || undefined },
		most_booked     : { primary_service: serviceType || undefined },
		spot_searches   : { search_type: serviceType || undefined },
		quotations      : { primary_service: serviceType || undefined },
		saved_for_later : { primary_service: serviceType || undefined },
	};

	return mapping[type] || {};
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
	const { user_profile } = useSelector(({ general, profile }) => ({
		...general,
		user_profile: profile,
	}));

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

	const { user = {}, authParams = '', selected_agent_id = '' } = user_profile;

	const { id: user_id = '' } = user;

	const { page, page_limit, activeStat, ...restFilters } = filters || {};

	const statsData = useMemo(() => getSalesDashboardListStats({
		data,
		rest,
		stats,
	}), [data, rest, stats]);

	const salesDashboardParams = useMemo(() => getSalesDashboardListParams(
		rest.type,
		{
			...(rest.defaultFilters || {}),
			...(restFilters || {}),
			...(activeStat?.filter || {}),
			importer_exporter_id    : importer_exporter_id || undefined,
			origin_location_id      : origin_location_id || undefined,
			destination_location_id : destination_location_id || undefined,
			...getKeyName({ type: rest.type, serviceType }),
		},
		{
			...(extraParams || {}),
			...(bucketParams || {}),
			page_limit,
			page,
		},
		user_profile,
		user_id,
	), [activeStat?.filter, bucketParams, destination_location_id,
		extraParams, importer_exporter_id, origin_location_id, page, user_id,
		page_limit, rest.defaultFilters, rest.type, restFilters, serviceType, user_profile]);

	const getList = async () => {
		try {
			await trigger({
				params: {
					...salesDashboardParams,
					filters: {
						...(salesDashboardParams.filters || {}),
						...(selected_agent_id && { performed_by_id: selected_agent_id }),
					},
				},
			});
		} catch (err) {
			if (err?.response?.data) {
				Toast.error(getApiErrorString(err?.response?.data));
			}
		}
	};

	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authParams,
		extraParams,
		serviceType,
		importer_exporter_id,
		origin_location_id,
		destination_location_id,
		filters,
		selected_agent_id,
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
