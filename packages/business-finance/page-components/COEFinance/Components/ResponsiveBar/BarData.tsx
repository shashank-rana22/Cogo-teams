import { format } from '@cogoport/utils';

import useGetDashboardData from '../../hook/useGetDashboardData';

const BarData = () => {
	const { dashboardData = [{}] } = useGetDashboardData();
	return dashboardData.map((item) => (
		{
			date     : format(item?.date, 'dd MMM ', {}, false),
			Approved : item?.approvedCount,
			Rejected : item?.rejectedCount,
		}));
};

export default BarData;
