import { useRequest } from '@cogoport/request';
import { isEmpty, startOfDay } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const getParams = ({ widgetBlocks, filterParams, selectedFilter, page }) => {
	const { date_range = {} } = filterParams || {};

	let blocks;

	if (!isEmpty(widgetBlocks)) {
		if (typeof widgetBlocks === 'string') {
			blocks = [widgetBlocks];
		} else {
			blocks = widgetBlocks;
		}
	}

	return 	{
		blocks,
		start_date : startOfDay(date_range?.startDate) || startOfDay(new Date()),
		end_date   : date_range?.endDate || new Date(),
		filters    : {
			range      : selectedFilter || undefined,
			page       : page || undefined,
			page_limit : page ? 5 : undefined,
		},
	};
};

const useSmeDashboardStats = ({
	widgetBlocks = null,
	filterParams = {},
	selectedFilter = '',
	page = '',
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
					params: getParams({ widgetBlocks, filterParams, selectedFilter, page }),
				});
			} catch (error) {
				console.error('err', error);
			}
		},
		[filterParams, page, selectedFilter, trigger, widgetBlocks],
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
