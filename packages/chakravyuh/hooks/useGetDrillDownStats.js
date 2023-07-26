import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetDrillDownStats = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_lifecycle',
		method : 'GET',
	}, { manual: true });

	const getDrillDownStats = useCallback(async () => {
		try {
			trigger();
		} catch (e) {
			// console.error(e);
		}
	}, [trigger]);

	useEffect(() => {
		getDrillDownStats();
	}, [getDrillDownStats]);

	return {
		drillDownCards : data?.cards || [],
		totalSearches  : data?.searches || GLOBAL_CONSTANTS.zeroth_index,
		loading,
	};
};

export default useGetDrillDownStats;
