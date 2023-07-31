import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAdvancePaymentView = ({ globalFilters, selectedPayrun, query }) => {
	const { pageIndex, pageSize } = globalFilters || {};
	const { id, batchNo } = selectedPayrun || {};

	const [{ data, loading },
		viewInvoicesAdvancePaymentTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/advance-payment',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_advance_payment',
	}, { manual: true, autoCancel: false });

	const getAdvancePaymentPayload = useCallback(() => ({
		payrunId : id,
		q        : query !== '' ? query : undefined,
		pageIndex,
		pageSize,
		batchNo,
	}), [batchNo, id, pageIndex, pageSize, query]);

	const getViewInvoicesAdvancePayment = useCallback(() => {
		const getPayload = getAdvancePaymentPayload();
		try {
			viewInvoicesAdvancePaymentTrigger({
				params: getPayload,
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [getAdvancePaymentPayload, viewInvoicesAdvancePaymentTrigger]);
	return {
		getViewInvoicesAdvancePayment,
		viewInvoicesAdvancePaymentData    : data,
		viewInvoicesAdvancePaymentLoading : loading,
	};
};

export default useGetAdvancePaymentView;
