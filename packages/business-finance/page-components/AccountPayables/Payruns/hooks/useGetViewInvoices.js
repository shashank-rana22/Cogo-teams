import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetViewInvoices = ({ globalFilters }) => {
	const { pageIndex, pageSize } = globalFilters || {};
	const [{ data:viewInvoiceDataList, loading:viewInvoiceDataLoading }, viewInvoiceTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill',
	}, { manual: true, autoCancel: false });

	const getViewInvoice = useCallback((id) => {
		try {
			viewInvoiceTrigger({
				params: {
					payrunId: id,
					pageIndex,
					pageSize,
				},
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [pageIndex, pageSize, viewInvoiceTrigger]);
	return {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	};
};

export default useGetViewInvoices;
