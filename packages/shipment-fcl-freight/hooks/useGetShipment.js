import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetShipment() {
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
						id                 : shipment_id,
						additional_methods : ['main_service', 'documents', 'bl_container_mapping'],
					},
				});
			} catch (err) {
				Toast.error(err);
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
			bl_container_mappings : data?.bl_container_mappings,
		},
	};
}

export default useGetShipment;
