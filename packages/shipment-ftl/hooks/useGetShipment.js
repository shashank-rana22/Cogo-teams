import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useGetShipment() {
	const [getShipmentStatusCode, setGetShipmentStatusCode] = useState();
	const router = useRouter();
	const { shipment_id } = router.query;

	const [{ loading : isGettingShipment, data }, trigger] = useRequest({
		url          : 'get_shipment',
		service_name : 'shipment',
		method       : 'GET',
	}, { manual: true });

	const getShipment = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						id: shipment_id,
					},
				});

				setGetShipmentStatusCode(res?.status);
			} catch (err) {
				toastApiError(err);

				setGetShipmentStatusCode(err?.response?.data?.status_code || err?.response?.status);
			}
		})();
	}, [trigger, shipment_id]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {

		get: {
			isGettingShipment,
			refetch               : getShipment,
			documents             : data?.documents,
			primary_service       : data?.primary_service,
			shipment_data         : data?.summary,
			document_delay_status : data?.document_delay_status,
			getShipmentStatusCode,
		},
	};
}

export default useGetShipment;
