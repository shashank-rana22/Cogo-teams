const dependentServicesArray = [
	'fcl_freight_local_service',
	'haulage_freight_service',
	'trailer_freight_service',
	'fcl_customs_service',
	'fcl_cfs_service',
];

export default function getUpdateBookingParameterPaylaod({ formValues, shipment_data, serviceData, servicesList }) {
	const payload = {
		shipment_id : shipment_data?.id,
		services    : [],
	};

	(formValues || []).forEach((formData) => {
		const { service_id, service_type, ...booking_params } = formData || {};

		const newBookingParams = {};
		Object.entries(booking_params).forEach(([key, val]) => {
			newBookingParams[key] = Number(val);
		});

		payload.services.push({ service_id, service_type, booking_params: newBookingParams });

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
				booking_params : newBookingParams,
			});
		});
	});
	return payload;
}
