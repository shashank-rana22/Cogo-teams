import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const useGetDrillDownStats = ({ globalFilters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_lifecycle',
		method : 'GET',
	}, { manual: true });

	const getDrillDownStats = useCallback(async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		const { service_type } = globalFilters;
		if (service_type === 'fcl') {
			const params = getFormattedPayload(globalFilters);
			getDrillDownStats(params);
		}
	}, [globalFilters, getDrillDownStats]);

	return {
		drillDownCards : data?.cards || [],
		modeWiseCount  : data?.mode_wise_rate_count?.reduce((obj, { parent_mode, rate_count }) => {
			const newObj = obj;
			if (['rate_extension', 'cluster_extension'].includes(parent_mode)) {
				if ('extended' in newObj) {
					newObj.extended += rate_count;
				} else {
					newObj.extended = rate_count;
				}
			} else {
				newObj[parent_mode] = rate_count;
			}
			return newObj;
		}, {}) || {},
		totalSearches: data?.searches || GLOBAL_CONSTANTS.zeroth_index,
		loading,
	};
};

export default useGetDrillDownStats;
