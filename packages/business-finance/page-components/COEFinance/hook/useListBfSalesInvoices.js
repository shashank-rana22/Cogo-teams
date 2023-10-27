import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const useListBfSalesInvoices = ({ serial_id }) => {
	const [
		{ loading: apiLoading, data },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/shipment/list',
			method  : 'GET',
			authKey : 'get_sales_invoice_shipment_list',
		},
		{ autoCancel: false },
	);

	const listApi = useCallback(async () => {
		try {
			await trigger({
				params: {
					jobNumber : serial_id || undefined,
					jobSource : 'LOGISTICS',
					jobType   : 'SHIPMENT',
					pageSize  : 10,
					page      : 1,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [serial_id, trigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return {
		salesList    : data?.list || [],
		salesLoading : apiLoading,
		refetch      : listApi,
	};
};

export default useListBfSalesInvoices;
