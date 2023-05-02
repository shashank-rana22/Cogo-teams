import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetBill = () => {
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
					jobNumbers : '145063',
					jobSource  : 'LOGISTICS',
					jobType    : 'SHIPMENT',
				},
			});
			setData(res.data);
		} catch (err) {
			console.log(err);
		}
	}, [listExpenseInvoicesTrigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return {
		loadingBills: billsApiLoading,
		data,

	};
};

export default useGetBill;
