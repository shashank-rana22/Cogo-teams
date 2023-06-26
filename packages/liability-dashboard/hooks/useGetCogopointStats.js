import { useRequest } from '@cogoport/request';
import { addDays } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { ADD_ONE_DAY } from '../constants';

const getParams = ({ currencyCode, activeHeaderTab, startDate, endDate }) => ({
	currency          : currencyCode,
	organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
	start_date        : addDays(startDate, ADD_ONE_DAY),
	end_date          : endDate || undefined,
});

const useGetCogopointStats = ({ activeHeaderTab = '', selectedDate = {}, currencyCode = '' }) => {
	const { startDate, endDate } = selectedDate || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cogopoint_liability_stats',
		method : 'get',
	}, { manual: true });

	const getCogopointStats = useCallback(() => {
		try {
			trigger({
				params: getParams({ currencyCode, activeHeaderTab, startDate, endDate }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, currencyCode, activeHeaderTab, startDate, endDate]);

	useEffect(() => {
		getCogopointStats();
	}, [getCogopointStats]);

	return {
		statsData: data,
		loading,
	};
};

export default useGetCogopointStats;
