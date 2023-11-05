import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const getParams = ({ widgetBlocks }) => ({
	blocks: isEmpty(widgetBlocks) ? undefined : widgetBlocks,
});

const useSmeDashboardStats = ({ widgetBlocks = null }) => {
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
					params: getParams({ widgetBlocks }),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[trigger, widgetBlocks],
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
