import { useRequest } from '@cogoport/request';
import { isEmpty, startOfDay } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const getParams = ({ widgetBlocks, filterParams, selectedFilter }) => {
	const { date_range = {} } = filterParams || {};

	return 	{
		blocks     : isEmpty(widgetBlocks) ? undefined : widgetBlocks,
		start_date : date_range?.startDate || startOfDay(new Date()),
		end_date   : date_range?.endDate || new Date(),
		filters    : { range: selectedFilter },
	};
};

const useSmeDashboardStats = ({
	widgetBlocks = null,
	filterParams = {},
	selectedFilter = '',
}) => {
	const [{ loading: dashboardLoading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_sme_dashboard',
		method : 'get',
	}, {
		manual: true,
	});

	const getSmeDashboardStats = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ widgetBlocks, filterParams, selectedFilter }),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[filterParams, selectedFilter, trigger, widgetBlocks],
	);

	useEffect(() => {
		getSmeDashboardStats();
	}, [getSmeDashboardStats]);

	return {
		dashboardLoading,
		getSmeDashboardStats,
		dashboardData: dashboardLoading ? {} : data,
	};
};

export default useSmeDashboardStats;
