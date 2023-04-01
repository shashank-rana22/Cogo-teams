import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

interface GenericObject {
	[key: string]: any;
}
interface Props {
	tabs?:string,
	jobsFilters?:string,
	filters: GenericObject;
	setFilters: (p: object) => void;
	globalFilters:GenericObject
	entityTabFilters?:string
}

const useGetProfitabillityShipmentList = (
	{ tabs, filters, setFilters, jobsFilters, globalFilters, entityTabFilters }:Props,
) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const apiUrl = {
		shipment : '/payments/dashboard/finance-profitability-shipment',
		customer : '/payments/dashboard/finance-profitability-customer',
	};
	const apiAuthKey = {
		shipment : 'get_payments_dashboard_finance_profitability_shipment',
		customer : 'get_payments_dashboard_finance_profitability_customer',
	};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : `${apiUrl[tabs]}`,
			method  : 'get',
			authKey : `${apiAuthKey[tabs]}`,
		},
		{ manual: true },
	);
	const { query, debounceQuery } = useDebounceQuery();
	const { startDate, endDate } = globalFilters?.date || {};

	const startDateFilter = startDate ? format(startDate as Date, 'yyyy-MM-dd', {}, false) : undefined;
	const endDateFilters = endDate ? format(endDate as Date, 'yyyy-MM-dd', {}, false) : undefined;

	useEffect(() => {
		const refetch = () => {
			try {
				trigger({
					params: {
						entityCode   : entityTabFilters === 'all' ? ['101', '301'] : entityTabFilters,
						serviceTypes : tabs === 'shipment' ? globalFilters?.serviceType : undefined,
						startDate    : tabs === 'shipment' ? startDateFilter : undefined,
						endDate      : tabs === 'shipment' ? endDateFilters : undefined,
						jobStatus    : jobsFilters || undefined,
						// sortType    : 'Desc',
						// sortBy      : 'profit',
						pageSize     : 5,
						q            : filters?.q || undefined,
						pageIndex    : filters?.pageIndex,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [tabs, filters, jobsFilters, globalFilters, endDateFilters, startDateFilter, trigger, entityTabFilters]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			q         : query || undefined,
			pageIndex : 1,
			pageSize  : 5,
		}));
	}, [query, setFilters]);

	return {
		profitabillityLoading : loading,
		profitabillityData    : data,
		setSearchValue,
		searchValue,

	};
};

export default useGetProfitabillityShipmentList;
