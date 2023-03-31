import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface FilterInterface {
	entityCode?:string
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
	const { entityCode = '', serviceType = '', companyType = '' } = filterValue || {};

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
						entityCode  : entityCode || undefined,
						month       : filters?.month || undefined,
						year        : filters?.year || undefined,
						serviceType : serviceType || undefined,
						companyType : companyType !== 'All' ? companyType : undefined,
						asOnDate    : filters?.date ? format(
							filters?.date,
							'yyyy-MM-dd 00:00:00',
							{},
							false,
						) : undefined,
						documentType: subActiveTab,
					},
				});
			} catch (e) {
				Toast.error(e?.error?.message || 'Something went wrong');
			}
		};
		getJourneyData();
	}, [journeyTrigger, filters, subActiveTab, entityCode, serviceType, companyType]);
	return {
		dailyStatsData,
		loading,
	};
};
export default useInvoiceStatistics;
