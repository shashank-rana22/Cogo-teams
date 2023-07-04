import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAdvPaymentInvoiceList = ({ activePayrunTab, globalFilters }) => {
	const [{ data:advancePaymentInvoiceList, loading:advancePaymentInvoiceLoading }, trigger] = useRequestBf({
		url     : 'purchase/payrun/advance-doc-list-view',
		method  : 'get',
		authKey : 'get_purchase_advance_list_view',
	}, { manual: true, autoCancel: false });

	const getAdvancePaymentInvoiceList = useCallback(async () => {
		try {
			await trigger({
				params: {
					pageIndex : globalFilters.pageIndex,
					pageSize  : 10,
					state     : activePayrunTab,
				},
			});
		} catch (error) {
			Toast.error(error.message || 'Somthing went wrong');
		}
	}, [trigger, globalFilters.pageIndex, activePayrunTab]);

	return {
		getAdvancePaymentInvoiceList,
		advancePaymentInvoiceList,
		advancePaymentInvoiceLoading,
	};
};

export default useGetAdvPaymentInvoiceList;
