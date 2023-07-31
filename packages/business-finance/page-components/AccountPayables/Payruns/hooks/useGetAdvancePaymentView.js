import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const getAdvancePaymentPayload = ({ id, query, pageIndex, pageSize, batchNo }) => ({
	payrunId : id,
	q        : query !== '' ? query : undefined,
	pageIndex,
	pageSize,
	batchNo,
});

const useGetAdvancePaymentView = ({ globalFilters, selectedPayrun, query }) => {
	const { pageIndex, pageSize } = globalFilters || {};
	const { id, batchNo } = selectedPayrun || {};

	const [{ data, loading },
		viewInvoicesAdvancePaymentTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/advance-payment',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_advance_payment',
	}, { manual: true, autoCancel: false });

	const getViewInvoicesAdvancePayment = useCallback(() => {
		const payload = getAdvancePaymentPayload({ id, query, pageIndex, pageSize, batchNo });
		try {
			viewInvoicesAdvancePaymentTrigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing went wrong');
		}
	}, [batchNo, id, pageIndex, pageSize, query, viewInvoicesAdvancePaymentTrigger]);
	return {
		getViewInvoicesAdvancePayment,
		viewInvoicesAdvancePaymentData    : data,
		viewInvoicesAdvancePaymentLoading : loading,
	};
};

export default useGetAdvancePaymentView;
