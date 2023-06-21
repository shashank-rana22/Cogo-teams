import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListShipmentCurrencyConversions = ({ shipmentData } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_currency_conversions',
	}, { manual: true });

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id: shipmentData?.id,
					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		data,
		loading,
	};
};
export default useListShipmentCurrencyConversions;
