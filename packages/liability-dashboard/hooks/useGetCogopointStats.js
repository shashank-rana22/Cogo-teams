import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCogopointStats = ({ activeHeaderTab = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cogopoint_stats',
		method : 'get',
	}, { manual: true });

	const getCogopointStats = useCallback(() => {
		trigger({
			params: {
				currency          : GLOBAL_CONSTANTS.currency_code.INR,
				organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
			},
		});
	}, [trigger, activeHeaderTab]);

	useEffect(() => {
		getCogopointStats();
	}, [getCogopointStats]);

	return {
		statsData: data,
		loading,
	};
};

export default useGetCogopointStats;
