import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetBill = ({ serial_id, accordionOpen }) => {
	const [
		{ data, loading: billsApiLoading },
		listExpenseInvoicesTrigger,

	] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			authKey : 'get_purchase_bills_list',
		},
		{ manual: true, autoCancel: false },
	);

	const listApi = useCallback(async () => {
		try {
			await listExpenseInvoicesTrigger({
				params: {
					jobNumbers : serial_id,
					jobSource  : 'LOGISTICS',
					jobType    : 'SHIPMENT',
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [listExpenseInvoicesTrigger, serial_id]);

	useEffect(() => {
		if (accordionOpen) {
			listApi();
		}
	}, [listApi, accordionOpen]);

	return {
		loadingBills : billsApiLoading,
		data         : data?.list,
	};
};

export default useGetBill;
