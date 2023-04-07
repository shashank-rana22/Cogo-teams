import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetShipment({ additional_methods }) {
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
				Toast.error(getApiErrorString(err));
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
		},
	};
}

export default useGetShipment;
