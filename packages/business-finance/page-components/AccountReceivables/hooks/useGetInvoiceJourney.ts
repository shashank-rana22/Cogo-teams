import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

import { months } from '../constants';

interface FilterInterface {
	serviceType?:string
	companyType?:string
}
interface ParamsInterface {
	filterValue?:FilterInterface
	entityCode?: string
}

const useGetInvoiceJourney = ({ filterValue, entityCode }:ParamsInterface) => {
	const { serviceType = '', companyType = '' } = filterValue || {};

	const d = new Date();
	const currentMonth = months[d.getMonth()];

	const currentYearsState = new Date().getFullYear();

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
			authKey : 'get_payments_dashboard_invoice_tat_stats',
		},
		{ manual: true },
	);
	useEffect(() => {
		const getJourneyData = async () => {
			try {
				await journeyTrigger({
					params: {
						entityCode  : entityCode || undefined,
						serviceType : serviceType || undefined,
						companyType : companyType !== 'All' ? companyType : undefined,
						month       : dateFilter.month || undefined,
						year        : dateFilter.year || undefined,

					},
				});
			} catch (e) {
				Toast.error(e?.error?.message || 'Something went wrong');
			}
		};
		getJourneyData();
	}, [journeyTrigger, entityCode, serviceType,
		companyType, dateFilter.month, dateFilter.year]);
	return {
		journeyData,
		journeyLoading,
		dateFilter,
		setDateFilter,
		optionsVal,
	};
};
export default useGetInvoiceJourney;
