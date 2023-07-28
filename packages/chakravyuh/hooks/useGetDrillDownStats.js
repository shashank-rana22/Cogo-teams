import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';

const useGetDrillDownStats = ({ globalFilters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_lifecycle',
		method : 'GET',
	}, { manual: true });

	const getDrillDownStats = useCallback(async (params) => {
		try {
			await trigger({ params });
		} catch (e) {
			// console.error(e);
		}
	}, [trigger]);

	useEffect(() => {
		const params = getFormattedPayload(globalFilters);
		getDrillDownStats(params);
	}, [globalFilters, getDrillDownStats]);

	return {
		drillDownCards : data?.cards || [],
		totalSearches  : data?.searches || GLOBAL_CONSTANTS.zeroth_index,
		loading,
	};
};

export default useGetDrillDownStats;
