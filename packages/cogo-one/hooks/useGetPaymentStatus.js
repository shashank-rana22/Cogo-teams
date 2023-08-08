import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPaymentStatus = ({ selectedPlan = {} }) => {
	const { checkout = {} } = selectedPlan || {};
	const { payment_order_id: paymentOrderId = '' } = checkout || {};

	const [{ loading, data }, trigger] = useRequestBf({
		url     : `/payment-gateway/orders/status/${paymentOrderId}`,
		method  : 'get',
		authKey : 'get_payment_gateway_orders_status_by_payment_order_id',
	}, { manual: true });

	const getPaymentStatus = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger]);

	useEffect(() => {
		if (paymentOrderId) {
			getPaymentStatus();
		}
	}, [getPaymentStatus, paymentOrderId]);

	return {
		getPaymentStatus,
		paymentDetails: data,
		loading,
	};
};
export default useGetPaymentStatus;
