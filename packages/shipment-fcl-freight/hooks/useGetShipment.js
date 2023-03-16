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
						id: 'cad59832-2185-4ead-aadb-91e36bea4a05',
					},
				}); if (!res.hasError) {
					Toast.error('dsfghj');
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
			refetch         : getShipment,
			primary_service : data?.primary_service_detail,
			shipment_data   : data?.summary,
		},
	};
}

export default useGetShipment;
