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
		url    : 'get_shipment',
		method : 'GET',
	}, { manual: true });

	const getShipment = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						id: 'c2f006c3-37d0-443f-af04-5083b16c63c5',
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
		isGettingShipment,
		refetch : getShipment,
		data    : {
			primary_service : data?.primary_service_detail,
			shipment_data   : data?.summary,
		},
	};
}

export default useGetShipment;
