import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const API_MAPPING = {
	fcl: {
		active_rates    : 'get_fcl_freight_rate_world',
		public_searches : 'get_user_interactions',
	},
	air: {
		active_rates    : 'get_air_freight_rate_world',
		public_searches : 'get_user_interactions',
	},
};

const useGetQuickViewStatistics = ({ activeTab = null, trade_type = 'import', globalFilters = {} }) => {
	const { service_type = 'fcl' } = globalFilters;
	const flag = !!activeTab;

	const [{ data, loading }, trigger] = useRequest({
		url    : API_MAPPING[service_type][activeTab],
		method : 'GET',
	}, { manual: true });

	const getStats = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				Toast.error('could not get stats');
			}
		},
		[trigger],
	);

	let maxCount = 0;
	let minCount = Infinity;

	const countMapping = (data?.statistics || []).reduce((acc, { count, country_id }) => {
		acc[country_id] = count;
		maxCount = Math.max(maxCount, count);
		minCount = Math.min(minCount, count);
		return acc;
	}, {});

	useEffect(() => {
		const filters = {
			trade_type,
			service_type,
			location_type: 'country',
		};

		if (flag) {
			getStats({ filters });
		}
	}, [flag, service_type, getStats, trade_type]);

	return { data, countMapping, maxCount, minCount, loading };
};

export default useGetQuickViewStatistics;
