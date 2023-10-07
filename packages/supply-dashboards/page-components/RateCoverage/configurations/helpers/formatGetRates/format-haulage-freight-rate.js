const formatHaulageFreightRate = ({ fields }) => {
	const newPayload = {
		service_provider_id     : fields?.service_provider_id,
		origin_location_id      : fields?.origin_location_id,
		destination_location_id : fields?.destination_location_id,
		container_size          : fields?.container_size,
		container_type          : fields?.container_type,
		shipping_line_id        : fields?.shipping_line_id,
		transport_modes         : fields?.transport_modes,
		haulage_type            : fields?.haulage_type,
	};
	return newPayload;
};
export default formatHaulageFreightRate;
