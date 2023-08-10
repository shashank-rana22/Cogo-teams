const DEPENDENT_SERVICE_ARRAY = [
	'air_freight_local_service',
	'air_customs_service',
	'ftl_freight_service',
	'ltl_freight_service',
];

const NO_PACKAGE = 0;

export default function getUpdateBookingParameterPaylaod({ formValues, shipment_data, serviceData, servicesList }) {
	const payload = {
		shipment_id : shipment_data?.id,
		services    : [],
	};

	(formValues || []).forEach((formData) => {
		const { service_id, service_type, ...booking_params } = formData || {};

		const NEW_BOOKING_PARAMS = {};
		Object.entries(booking_params).forEach(([key, val]) => {
			NEW_BOOKING_PARAMS[key] = Number(val);
			if (key === 'packages') {
				const FORMATTED_PACKAGES = [];
				booking_params[key].forEach((pack) => {
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
						packages_count        : +packages_count || NO_PACKAGE,
						total_packages_weight : +total_packages_weight || null,
					};
					FORMATTED_PACKAGES.push(formatPack);
				});
				NEW_BOOKING_PARAMS[key] = FORMATTED_PACKAGES;
			}
		});

		payload.services.push({ service_id, service_type, booking_params: NEW_BOOKING_PARAMS });

		const dependentServices = servicesList.filter(
			(service) => DEPENDENT_SERVICE_ARRAY.includes(service?.service_type),
		);

		dependentServices.filter(
			(service) => serviceData.container_size === service.container_size
					&& serviceData.container_type === service.container_type,
		);

		dependentServices.forEach((dependentService) => {
			payload.services.push({
				service_id     : dependentService?.id,
				service_type   : dependentService?.service_type,
				booking_params : NEW_BOOKING_PARAMS,
			});
		});
	});
	return payload;
}
