import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getDependentServices from '../utils/get-dependent-services';

const getServicesData = (serviceCardFormRef, servicesProps, shipment_type) => new Promise((resolve) => {
	const services = [];
	let canUpdate = false;
	let noValues = false;

	Object.keys(serviceCardFormRef.current)?.forEach((featureKey) => {
		const serviceMargins = serviceCardFormRef?.current[featureKey];
		const { detail, handleSubmit, onError } = serviceMargins || {};

		handleSubmit(
			(values) => {
				const booking_params = {};
				const updated_params = {};
				Object.keys(values)?.forEach((key) => {
					if (values[key] && Number(values[key]) !== Number(detail[key])) {
						updated_params[key] = Number(values[key]);
					}
					if (values[key]) {
						booking_params[key] = Number(values[key]);
					}
					if (key === 'packages') {
						const formattedPackages = [];
						values[key].forEach((pack) => {
							const {
								length,
								width,
								height,
								packages_count,
								total_packages_weight,
							} = pack;
							const formatPack = {
								...pack,
								length                : +length || null,
								width                 : +width || null,
								height                : +height || null,
								packages_count        : +packages_count || 0,
								total_packages_weight : +total_packages_weight || null,
							};
							formattedPackages.push(formatPack);
						});
						booking_params[key] = formattedPackages;
					}
				});

				if (Object.keys(updated_params)?.length > 0) {
					canUpdate = true;
				}

				services.push({
					service_id   : detail?.id,
					service_type : detail?.service_type,
					booking_params,
				});

				// if (shipment_type === 'rail_domestic_freight') {
				// 	services.push({
				// 		service_id     : detail?.id,
				// 		service_type   : detail?.service_type,
				// 		booking_params : {
				// 			...booking_params,
				// 			container_size   : +detail.container_size,
				// 			containers_count : detail.containers_count,
				// 		},
				// 	});
				// } else {
				// 	services.push({
				// 		service_id   : detail?.id,
				// 		service_type : detail?.service_type,
				// 		booking_params,
				// 	});
				// }

				const dependentServices = getDependentServices(detail, servicesProps);

				if (dependentServices && shipment_type === 'fcl_freight') {
					dependentServices?.forEach((serviceItem) => {
						services.push({
							service_id   : serviceItem?.id,
							service_type : serviceItem?.service_type,
							booking_params,
						});
					});
				}
			},
			(errs) => {
				noValues = true;
				onError(errs);
			},
		)();
	});

	setTimeout(() => {
		resolve({ services, canUpdate, noValues });
	}, 300);
});

function useUpdateShipmentBookingParams({
	shipment_data = {},
	servicesProps,
	serviceCardFormRef,
	onCancel = () => {},
	refetch = () => {},
	refetchServices = () => {},
	shipment_type = '',
}) {
	const [isLoading, setIsLoading] = useState(false);

	// const api = 'update_shipment_booking_parameter';
	// if (shipment_type === 'air_freight')
	// 	api = 'update_international_air_shipment_booking_parameter';

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_booking_parameter',
		method : 'POST',
	});

	const onUpdate = async () => {
		const { canUpdate, services, noValues } = await getServicesData(
			serviceCardFormRef,
			servicesProps,
			shipment_type,
		);

		if (noValues) {
			Toast.error('Please provide all values!');
			return;
		}
		if (!canUpdate) {
			Toast.error('No parameters changed!');
			return;
		}

		const payload = {
			shipment_id: shipment_data?.id,
			services,
		};

		try {
			setIsLoading(true);
			const response = await trigger({ data: payload });

			if (response.status === 200) {
				Toast.success(
					'Booking params have been changed. Please check the quotation.',
				);
				onCancel();
				refetch();
				refetchServices();
			}
			setIsLoading(false);
		} catch (e) {
			Toast(e?.data);
			setIsLoading(false);
		}
	};
	return { onUpdate, isLoading };
}
export default useUpdateShipmentBookingParams;
