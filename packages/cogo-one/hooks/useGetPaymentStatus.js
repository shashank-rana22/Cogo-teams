import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPaymentStatus = () => {
	const [{ loading, data }, trigger] = useRequestBf({
		url    : '/payment-gateway/orders/status/e83',
		method : 'get',
	}, { manual: true });

	const getPaymentStatus = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger]);

	useEffect(() => {
		getPaymentStatus();
	}, [getPaymentStatus]);

	return {
		getPaymentStatus,
		paymentDetails: data,
		loading,
	};
};
export default useGetPaymentStatus;
