import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface FilterInterface {
	entityType?:string
	serviceType?:string
	companyType?: string
}
interface ParamsInterface {
	filterValue?:FilterInterface
	filters?:SubFilterInterface
	subActiveTab?:string
}
interface SubFilterInterface {
	month?:string
	year?:string
	date?:Date
}
const useInvoiceStatistics = ({ filters, filterValue, subActiveTab }:ParamsInterface) => {
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
			try {
				await journeyTrigger({
					params: {
						cogoEntityId : filterValue?.entityType || undefined,
						month        : filters?.month || undefined,
						year         : filters?.year || undefined,
						serviceType  : filterValue?.serviceType || undefined,
						companyType  : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
						asOnDate     : format(
							filters?.date,
							'yyyy-MM-dd 00:00:00',
							{},
							false,
						) || undefined,
						documentType: subActiveTab,
					},
				});
			} catch (e) {
				console.log(e);
			}
		};
		getJourneyData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [journeyTrigger, filters, filterValue, subActiveTab]);
	return {
		dailyStatsData,
		loading,
	};
};
export default useInvoiceStatistics;
