import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface FilterInterface {
	entityCode?:string
	serviceType?:string
	companyType?:string
}
interface ParamsInterface {
	filterValue?:FilterInterface
	month?:string
}

const useGetInvoiceJourney = ({ month, filterValue }:ParamsInterface) => {
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
						entityCode  : filterValue.entityCode || undefined,
						serviceType : filterValue?.serviceType || undefined,
						companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
						month       : month || undefined,

					},
				});
			} catch (e) {
				Toast.error(e?.error?.message || 'Something went wrong');
			}
		};
		getJourneyData();
	}, [journeyTrigger, filterValue.entityCode, filterValue?.serviceType, filterValue.companyType, month]);
	return {
		journeyData,
		journeyLoading,
	};
};
export default useGetInvoiceJourney;
