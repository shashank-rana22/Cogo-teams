import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useListShipmentServices() {
	// const {
	// 	id,
	// } = useSelector(({ general }) => ({
	// 	id: general?.query?.id || '',
	// }));

	const [{ loading : servicesLoading, data }, trigger] = useRequest({
		url    : 'list_shipment_services',
		method : 'GET',
	}, { manual: true });

	const listServices = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						shipment_id: 'cad59832-2185-4ead-aadb-91e36bea4a05',
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
		listServices();
	}, [listServices]);

	console.log({ data });

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : data?.list || [],
		},

	};
}

export default useListShipmentServices;
