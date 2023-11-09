import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const getInvoiceMapping = (invoicesList) => {
	const invoiceMap = invoicesList.reduce((result, invoice) => (
		{ ...result, [invoice?.invoiceNumber]: invoice?.invoicePdfUrl }), {});
	return invoiceMap;
};

const useListBfSalesInvoices = ({ jobNumber }) => {
	const [{ loading = false, data = {} }, trigger] = useRequestBf(
		{
			url     : '/sales/invoice/shipment/list',
			method  : 'GET',
			authKey : 'get_sales_invoice_shipment_list',
		},
	);

	const listApi = useCallback(async () => {
		try {
			await trigger({
				params: {
					jobNumber : jobNumber || undefined,
					jobSource : 'LOGISTICS',
					jobType   : 'SHIPMENT',
					pageSize  : 10,
					page      : 1,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [jobNumber, trigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return {
		invoicesMap     : getInvoiceMapping(data?.list || []),
		invoicesLoading : loading,
		refetch         : listApi,
	};
};

export default useListBfSalesInvoices;
