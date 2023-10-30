import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetShipment({ shipment_id }) {
	const [{ loading: shipment_loading, data }, trigger] = useRequest({
		url          : '/get_shipment',
		method       : 'GET',
		service_name : 'shipment',
		params       : {
			id: shipment_id,
		},
	}, { manual: true });

	const getShipment = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			// console.log(err);
		}
	}, [trigger]);

	return {
		data,
		shipment_loading,
		getShipment,
	};
}

export default useGetShipment;
