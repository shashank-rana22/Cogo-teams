import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetViewInvoices = ({ globalFilters, selectedPayrun, query }) => {
	const { id } = selectedPayrun || {};
	const { pageIndex, pageSize } = globalFilters || {};
	const [{ data:viewInvoiceDataList, loading:viewInvoiceDataLoading }, viewInvoiceTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill',
	}, { manual: true, autoCancel: false });

	const getViewInvoice = useCallback(() => {
		try {
			viewInvoiceTrigger({
				params: {
					payrunId : id,
					pageIndex,
					pageSize,
					q        : query !== '' ? query : undefined,
				},
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [id, pageIndex, pageSize, query, viewInvoiceTrigger]);
	return {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	};
};

export default useGetViewInvoices;
