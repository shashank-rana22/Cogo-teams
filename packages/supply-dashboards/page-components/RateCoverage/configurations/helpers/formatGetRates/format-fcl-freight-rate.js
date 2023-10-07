const formatFclFreightRate = ({ fields }) => {
	const newPayload = {
		service_provider_id : fields?.service_provider_id,
		origin_port_id      : fields?.origin_location_id,
		destination_port_id : fields.destination_location_id,
		commodity:
			fields?.commodity === 'all_commodity' ? undefined : fields?.commodity,
		container_size           : fields.container_size,
		container_type           : fields.container_type,
		shipping_line_id         : fields.shipping_line_id,
		origin_main_port_id      : fields.origin_main_port_id || undefined,
		destination_main_port_id : fields.destination_main_port_id || undefined,
	};
	return newPayload;
};
export default formatFclFreightRate;
