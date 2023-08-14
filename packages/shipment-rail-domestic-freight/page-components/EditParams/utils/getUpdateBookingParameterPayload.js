const dependentServicesArray = [
	'lcl_freight_local_service',
	'lcl_customs_service',
	'ftl_freight_service',
	'ltl_freight_service',
];

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
		});

		payload.services.push({ service_id, service_type, booking_params: NEW_BOOKING_PARAMS });

		const dependentServices = servicesList.filter(
			(service) => dependentServicesArray.includes(service?.service_type),
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
