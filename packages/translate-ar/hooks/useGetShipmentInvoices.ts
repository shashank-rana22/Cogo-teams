/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

import { FilterProps, StatusObject } from '../common/interfaces';

const useGetShipmentInvoices = ({ status }: StatusObject) => {
	const [shipmentFilters, setShipmentFilters] = useState<FilterProps>({
		page      : 1,
		pageLimit : 10,
	});

	const { search, ...rest } = shipmentFilters || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/list',
			method  : 'get',
			authKey : 'get_sales_invoice_list',
		},
		{ autoCancel: false, manual: true },
	);

	const { query, debounceQuery } = useDebounceQuery();
	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	const refetch = (p?:number) => {
		try {
			trigger({
				params: {
					...rest,
					entityCode: 501,
					translationStatus:
						status !== 'completed'
							? ['PROFORMA_INIT', 'INVOICE_INIT']
							: ['PROFORMA_COMPLETE', 'INVOICE_COMPLETE'],
					q    : query || undefined,
					page : p || shipmentFilters?.page,
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
		refetch(1);
	}, [status, query]);

	return {
		invoiceLoading : loading,
		invoiceData    : data,
		setShipmentFilters,
		shipmentFilters,
		refetch,
	};
};

export default useGetShipmentInvoices;
