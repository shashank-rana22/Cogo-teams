import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface FilterInterface {
	entityType?:string
	serviceType?:string
	companyType?:string
}
interface ParamsInterface {
	filterValue?:FilterInterface
	date?:DateInterface
}
interface DateInterface {
	startDate?:Date
	endDate?:Date
}
const useGetInvoiceJourney = ({ date, filterValue }:ParamsInterface) => {
	const [{ data:journeyData, loading:journeyLoading }, journeyTrigger] = useRequestBf(
		{
			url     : '/payments/dashboard/invoice-tat-stats',
			method  : 'get',
			authKey : 'get_payments_dashboard_invoice_timeline',
		},
		{ manual: true },
	);
	useEffect(() => {
		const getJourneyData = async () => {
			try {
				await journeyTrigger({
					params: {
						cogoEntityId : filterValue.entityType || undefined,
						serviceType  : filterValue?.serviceType || undefined,
						companyType  : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
						startDate    : date?.startDate
							? format(
								date?.startDate,
								'yyyy-MM-dd',
								{},
								false,
							) : undefined,
						endDate: date?.endDate
							? format(
								date?.endDate,
								'yyyy-MM-dd',
								{},
								false,
							) : undefined,

					},
				});
			} catch (e) {
				Toast.error(e?.error?.message || 'Something went wrong');
			}
		};
		getJourneyData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [journeyTrigger, filterValue.entityType, date, filterValue.serviceType, filterValue.companyType]);
	return {
		journeyData,
		journeyLoading,
	};
};
export default useGetInvoiceJourney;
