import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetShipment() {
	// const {
	// 	id,
	// } = useSelector(({ general }) => ({
	// 	id: general?.query?.id || '',
	// }));

	const [{ loading : isGettingShipment, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_shipment',
		method : 'GET',
	}, { manual: true });

	const getShipment = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						id                 : '8c45f372-a81d-4293-8097-ae00f403e2b7',
						additional_methods : ['main_service', 'documents', 'containers'],
					},
				}); if (!res.hasError) {
					// Toast.error('dsfghj');
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger]);

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
