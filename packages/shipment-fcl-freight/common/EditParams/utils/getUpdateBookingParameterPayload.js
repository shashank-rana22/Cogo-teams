import getDependentServices from '../../utils/getDependentServices';

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

		const dependentServices = getDependentServices({ servicesList, serviceData });

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
