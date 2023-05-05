import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetBill = ({ serial_id }) => {
	const [
		{ loading: billsApiLoading },
		listExpenseInvoicesTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			authKey : 'get_purchase_bills_list',
		},
		{ autoCancel: false },
	);

	const [data, setData] = useState({});

	const listApi = useCallback(async () => {
		try {
			const res = await listExpenseInvoicesTrigger({
				params: {
					jobNumbers : serial_id,
					jobSource  : 'LOGISTICS',
					jobType    : 'SHIPMENT',
				},
			});
			setData(res.data);
		} catch (err) {
			toastApiError(err);
		}
	}, [listExpenseInvoicesTrigger, serial_id]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return {
		loadingBills: billsApiLoading,
		data,

	};
};

export default useGetBill;
