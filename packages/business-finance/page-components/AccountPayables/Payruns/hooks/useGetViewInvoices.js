import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const viewInvoicePayload = ({ id, batchNo, pageIndex, pageSize, activePayrunTab, query }) => ({
	payrunId           : id,
	batchNo,
	pageIndex,
	pageSize,
	uploadDateSortType : 'desc',
	dueDateSortType    : 'asc',
	createdAtSortType  : 'desc',
	status             : activePayrunTab === 'COMPLETED' ? 'COMPLETED' : undefined,
	q                  : query !== '' ? query : undefined,
});

const useGetViewInvoices = ({ activePayrunTab, globalFilters, selectedPayrun, query }) => {
	const { id, batchNo } = selectedPayrun || {};
	const { pageIndex, pageSize } = globalFilters || {};

	const [{ data, loading }, viewInvoiceTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill',
	}, { manual: true, autoCancel: false });

	const getViewInvoice = useCallback(() => {
		const payload = viewInvoicePayload({ id, batchNo, pageIndex, pageSize, activePayrunTab, query });
		try {
			viewInvoiceTrigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [activePayrunTab, batchNo, id, pageIndex, pageSize, query, viewInvoiceTrigger]);

	return {
		getViewInvoice,
		viewInvoiceDataList    : data,
		viewInvoiceDataLoading : loading,
	};
};

export default useGetViewInvoices;
