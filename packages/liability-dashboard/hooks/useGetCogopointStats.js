import { useRequest } from '@cogoport/request';
import { addDays } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const ADD_DAY = 1;

const useGetCogopointStats = ({ activeHeaderTab = '', selectedDate = {}, currencyCode = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cogopoint_liability_stats',
		method : 'get',
	}, { manual: true });

	const { startDate, endDate } = selectedDate || {};

	const getCogopointStats = useCallback(() => {
		trigger({
			params: {
				currency          : currencyCode,
				organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
				start_date        : addDays(startDate, ADD_DAY),
				end_date          : endDate,
			},
		});
	}, [trigger, activeHeaderTab, startDate, endDate, currencyCode]);

	useEffect(() => {
		getCogopointStats();
	}, [getCogopointStats]);

	return {
		statsData: data,
		loading,
	};
};

export default useGetCogopointStats;
