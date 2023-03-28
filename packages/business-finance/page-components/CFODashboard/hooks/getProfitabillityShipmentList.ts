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
	jobsFilters?:object,
	filters: GenericObject;
	setFilters: (p: object) => void;
}

const useGetProfitabillityShipmentList = ({ tabs, filters, setFilters, jobsFilters, globalFilters }:Props) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const apiUrl = {
		shipment : '/payments/dashboard/bf-profitability-shipment',
		customer : '/payments/dashboard/bf-profitability-customer',
	};
	const apiAuthKey = {
		shipment : 'get_payments_dashboard_bf_profitability_shipment',
		customer : 'get_payments_dashboard_bf_profitability_customer',
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

	const refetch = () => {
		try {
			trigger({
				params: {
					...filters,
					serviceType : tabs === 'shipment' ? globalFilters?.serviceType : undefined,
					startDate   : tabs === 'shipment' ? startDateFilter : undefined,
					endDate     : tabs === 'shipment' ? endDateFilters : undefined,
					jobStatus   : jobsFilters,
					sortType    : 'Desc',
					sortBy      : 'profit',
					pageSize    : 5,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			q         : query || undefined,
			pageIndex : 1,
			pageSize  : 5,
			jobStatus : '',
		}));
	}, [query]);

	useEffect(() => {
		refetch();
	}, [tabs, filters, jobsFilters, globalFilters]);

	return {
		profitabillityLoading : loading,
		profitabillityData    : data,
		refetch,
		setSearchValue,
		searchValue,

	};
};

export default useGetProfitabillityShipmentList;
