import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentCurrencyConversions = ({ shipmentData } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_currency_conversions',
	}, { manual: true });

	const shipmentId = shipmentData?.id;

	const getList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id: shipmentId,
					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, shipmentId]);
	useEffect(() => {
		getList();
	}, [getList]);
	return {
		data,
		loading,
	};
};
export default useListShipmentCurrencyConversions;
