import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

const useInvoiceStatistics = ({ filters, subActiveTab, entityCode, toggleData }) => {
	const [{ data:dailyStatsData, loading }, journeyTrigger] = useRequestBf(
		{
			url     : '/payments/dashboard/daily-sales-statistics',
			method  : 'get',
			authKey : 'get_payments_dashboard_daily_sales_statistics',
		},
		{ manual: true },
	);
	useEffect(() => {
		const getJourneyData = async () => {
			await journeyTrigger({
				params: {
					entityCode : entityCode || undefined,
					month      : filters?.month || undefined,
					year       : filters?.year || undefined,
					asOnDate   : filters?.date ? format(
						filters?.date,
						'yyyy-MM-dd 00:00:00',
						{},
						false,
					) : undefined,
					documentType: subActiveTab,
				},
			});
		};
		if (!toggleData) {
			getJourneyData();
		}
	}, [journeyTrigger, filters, subActiveTab, entityCode, toggleData]);
	return {
		dailyStatsData,
		loading,
	};
};
export default useInvoiceStatistics;
