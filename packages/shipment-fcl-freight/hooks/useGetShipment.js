import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetShipment() {
	const router = useRouter();
	const shipment_id = router.query.freight_id;

	const [{ loading : isGettingShipment, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_shipment',
		method : 'GET',
	}, { manual: true });

	const getShipment = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						id                 : shipment_id,
						additional_methods : ['main_service', 'documents', 'containers'],
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, shipment_id]);

	useEffect(() => {
		getShipment();
	}, [getShipment]);

	return {

		get: {
			isGettingShipment,
			refetch           : getShipment,
			documents         : data?.documents,
			primary_service   : data?.primary_service,
			shipment_data     : data?.summary,
			container_details : data?.container_details,
		},
	};
}

export default useGetShipment;
