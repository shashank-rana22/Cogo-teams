import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useListShipmentServices({ shipment_data }) {
	// const {
	// 	id,
	// } = useSelector(({ general }) => ({
	// 	id: general?.query?.id || '',
	// }));

	const [{ loading : servicesLoading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_services',
		method : 'GET',
	}, { manual: true });

	const listServices = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						filters: {
							shipment_id: shipment_data?.id,
						},
						additional_methods: ['service_objects', 'stakeholder'],
					},
				});
				if (!res.hasError) {
					Toast.success('Service List Fetched Successfully');
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, shipment_data?.id]);

	useEffect(() => {
		if (shipment_data?.id) { listServices(); }
	}, [listServices, shipment_data?.id]);

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : data?.list || [],
		},

	};
}

export default useListShipmentServices;
