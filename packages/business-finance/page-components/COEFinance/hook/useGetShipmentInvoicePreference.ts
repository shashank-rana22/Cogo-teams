import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetShipmentInvoicePreference(shipmentId) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_invoice_preference',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		const fetch = async () => {
			try {
				await trigger({
					params: {
						shipment_id: shipmentId,
					},
				});
			} catch (e) {
				console.log(e);
			}
		};
		fetch();
	}, [shipmentId, trigger]);

	return {
		loading,
		data,
	};
}

export default useGetShipmentInvoicePreference;
