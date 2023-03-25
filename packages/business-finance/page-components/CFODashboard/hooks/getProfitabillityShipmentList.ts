/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetProfitabillityShipmentList = ({ tabs }) => {
	console.log(tabs, 'tabs');

	const [shipmentFilters, setShipmentFilters] = useState({
		page        : 1,
		pageLimit   : 5,
		searchQuery : '',
	});
	const { search, ...rest } = shipmentFilters || {};

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
	console.log(data, 'data');
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	const refetch = () => {
		try {
			trigger({
				params: {
					q         : query || undefined,
					jobStatus : undefined,
					sortType  : 'Desc',
					sortBy    : 'createdAt',
					pageIndex : shipmentFilters?.page,
					pageSize  : 5,

				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, [JSON.stringify(rest), tabs]);

	useEffect(() => {
		setShipmentFilters({
			...shipmentFilters,
			searchQuery : query,
			page        : 1,
		});
	}, [query]);
	return {
		profitabillityLoading : loading,
		profitabillityData    : data,
		refetch,
		setShipmentFilters,
		shipmentFilters,
	};
};

export default useGetProfitabillityShipmentList;
