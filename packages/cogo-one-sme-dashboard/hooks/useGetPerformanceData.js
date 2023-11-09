import { useRequest } from '@cogoport/request';
import { startOfDay } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const getParams = ({ hierarchyData, dateRange }) => {
	const lastElement = hierarchyData?.[(hierarchyData?.length || 0) - 1] || {};

	const { hierarchyDataType = '', id = '' } = lastElement || {};

	return 	{
		blocks     : ['get_performance_data'],
		start_date : startOfDay(dateRange?.startDate || new Date()),
		end_date   : dateRange?.endDate || new Date(),
		filters    : {
			partner_id           : (hierarchyDataType === 'partners' ? id : '') || undefined,
			office_location_id   : (hierarchyDataType === 'branches' ? id : '') || undefined,
			reporting_manager_id : (hierarchyDataType === 'managers' ? id : '') || undefined,
			agent_id             : (hierarchyDataType === 'users' ? id : '') || undefined,
		},
	};
};

const useGetPerformanceData = ({
	hierarchyData = [],
	dateRange = {},
}) => {
	const [{ data, loading: dashboardLoading }, trigger] = useRequest({
		url    : '/get_omnichannel_sme_dashboard',
		method : 'get',
	}, {
		manual     : true,
		autoCancel : false,
	});

	const getPerformanceData = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ hierarchyData, dateRange }),
				});
			} catch (error) {
				console.error('err', error);
			}
		},
		[dateRange, hierarchyData, trigger],
	);

	useEffect(() => {
		getPerformanceData();
	}, [getPerformanceData]);

	return {
		dashboardLoading,
		dashboardData: dashboardLoading ? {} : data,
	};
};

export default useGetPerformanceData;
