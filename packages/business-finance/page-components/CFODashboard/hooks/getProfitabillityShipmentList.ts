/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetProfitabillityShipmentList = () => {
	const [shipmentFilters, setShipmentFilters] = useState({
		page        : 1,
		pageLimit   : 10,
		searchQuery : '',
	});
	const { search, ...rest } = shipmentFilters || {};
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/dashboard/bf-profitability-shipment',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_profitability_shipment',
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
					page      : shipmentFilters?.page,

				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, [JSON.stringify(rest)]);

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
