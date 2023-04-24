import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useGetShipment({ additional_methods }) {
	const [getShipmentStatusCode, setGetShipmentStatusCode] = useState();
	const router = useRouter();
	const { shipment_id } = router.query;

	const [{ loading : isGettingShipment, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_shipment',
		method : 'GET',
	}, { manual: true });

	const getShipment = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						id: shipment_id,
						additional_methods,
					},
				});
			} catch (err) {
				toastApiError(err);
				setGetShipmentStatusCode(err?.response?.data?.status_code);
			}
		})();
	}, [trigger, shipment_id, additional_methods]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {

		get: {
			isGettingShipment,
			refetch         : getShipment,
			documents       : data?.documents,
			primary_service : data?.primary_service,
			shipment_data   : data?.summary,
			getShipmentStatusCode,
		},
	};
}

export default useGetShipment;
