/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetProfitabillityShipmentList = ({ tabs, filters, setFilters, jobsFilters }) => {
	const [searchValue, setSearchValue] = useState('');

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

	const refetch = () => {
		try {
			trigger({
				params: {
					...filters,
					jobStatus : jobsFilters,
					sortType  : 'Desc',
					sortBy    : 'createdAt',
					pageSize  : 5,
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
	}, [tabs, filters, jobsFilters]);

	return {
		profitabillityLoading : loading,
		profitabillityData    : data,
		refetch,
		setSearchValue,
		searchValue,

	};
};

export default useGetProfitabillityShipmentList;
