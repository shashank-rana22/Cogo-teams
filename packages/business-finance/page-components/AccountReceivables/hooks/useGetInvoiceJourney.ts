import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

interface FilterInterface {
	entityCode?:string
	serviceType?:string
	companyType?:string
}
interface ParamsInterface {
	filterValue?:FilterInterface
}

const useGetInvoiceJourney = ({ filterValue }:ParamsInterface) => {
	const months = ['JAN', 'FEB', 'MAR',
		'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	const d = new Date();
	const currentMonth = months[d.getMonth()];

	const currentYearsState = new Date().getFullYear();

	console.log('currentYearsState', currentYearsState);

	function generateArrayOfYears() {
		const currentYear = new Date().getFullYear();
		const newArray = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
		return newArray;
	}

	const optionsVal = () => generateArrayOfYears().map((item) => ({ value: item.toString(), label: item.toString() }));

	const [dateFilter, setDateFilter] = useState({
		month : currentMonth,
		year  : currentYearsState.toString(),
	});
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
						month       : dateFilter.month || undefined,
						year        : dateFilter.year || undefined,

					},
				});
			} catch (e) {
				Toast.error(e?.error?.message || 'Something went wrong');
			}
		};
		getJourneyData();
	}, [journeyTrigger, filterValue.entityCode, filterValue?.serviceType,
		filterValue.companyType, dateFilter.month, dateFilter.year]);
	return {
		journeyData,
		journeyLoading,
		dateFilter,
		setDateFilter,
		optionsVal,
	};
};
export default useGetInvoiceJourney;
