export default function getUpdateBookingParameterPaylaod({ formValues, shipment_data }) {
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
	});
	return payload;
}
