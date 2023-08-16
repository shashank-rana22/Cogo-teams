import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import ToastApiError from '../common/ToastApiError';

function useListShipmentSellQuotation({ id = '' }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_invoice_preference',
		method : 'GET',
	}, { manual: true });

	const getShipmentSellQuotation = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id: id,
				},
			});
		} catch (err) {
			ToastApiError(err);
		}
	}, [trigger, id]);

	useEffect(() => {
		getShipmentSellQuotation();
	}, [getShipmentSellQuotation]);

	return {
		data,
		loading,
		getShipmentSellQuotation,
		refetch: getShipmentSellQuotation,
	};
}

export default useListShipmentSellQuotation;
