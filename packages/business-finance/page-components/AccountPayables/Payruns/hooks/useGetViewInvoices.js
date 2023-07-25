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

	const viewInvoicePayload = useCallback(() => ({
		payrunId           : id,
		batchNo,
		pageIndex,
		pageSize,
		uploadDateSortType : 'desc',
		dueDateSortType    : 'asc',
		createdAtSortType  : 'desc',
		status             : activePayrunTab === 'COMPLETED' ? 'COMPLETED' : undefined,
		q                  : query !== '' ? query : undefined,
	}), [activePayrunTab, batchNo, id, pageIndex, pageSize, query]);

	const getViewInvoice = useCallback(() => {
		const getPayload = viewInvoicePayload();
		try {
			viewInvoiceTrigger({
				params: getPayload,
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [viewInvoicePayload, viewInvoiceTrigger]);
	return {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	};
};

export default useGetViewInvoices;
