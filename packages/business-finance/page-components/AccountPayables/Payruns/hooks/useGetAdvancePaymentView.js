import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAdvancePaymentView = ({ globalFilters, selectedPayrun, query }) => {
	const { pageIndex, pageSize } = globalFilters || {};
	const { id } = selectedPayrun || {};
	const [{ data:viewInvoicesAdvancePaymentData, loading:viewInvoicesAdvancePaymentLoading },
		viewInvoicesAdvancePaymentTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/advance-payment',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_advance_payment',
	}, { manual: true, autoCancel: false });
	const getViewInvoicesAdvancePayment = useCallback(() => {
		try {
			viewInvoicesAdvancePaymentTrigger({
				params: {
					payrunId : id,
					q        : query !== '' ? query : undefined,
					pageIndex,
					pageSize,
				},
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [id, pageIndex, pageSize, query, viewInvoicesAdvancePaymentTrigger]);
	return {
		getViewInvoicesAdvancePayment,
		viewInvoicesAdvancePaymentData,
		viewInvoicesAdvancePaymentLoading,
	};
};

export default useGetAdvancePaymentView;
