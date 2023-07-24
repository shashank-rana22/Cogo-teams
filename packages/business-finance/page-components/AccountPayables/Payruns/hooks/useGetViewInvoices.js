import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetViewInvoices = ({ activePayrunTab, globalFilters, selectedPayrun, query }) => {
	const { id, batchNo } = selectedPayrun || {};
	const { pageIndex, pageSize } = globalFilters || {};
	const [{ data: viewInvoiceDataList, loading: viewInvoiceDataLoading }, viewInvoiceTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill',
	}, { manual: true, autoCancel: false });

	const getViewInvoice = useCallback(() => {
		try {
			viewInvoiceTrigger({
				params: {
					payrunId           : id,
					batchNo,
					pageIndex,
					pageSize,
					uploadDateSortType : 'desc',
					dueDateSortType    : 'asc',
					createdAtSortType  : 'desc',
					status             : activePayrunTab === 'COMPLETED' ? 'COMPLETED' : undefined,
					q                  : query !== '' ? query : undefined,
				},
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [activePayrunTab, batchNo, id, pageIndex, pageSize, query, viewInvoiceTrigger]);
	return {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	};
};

export default useGetViewInvoices;
