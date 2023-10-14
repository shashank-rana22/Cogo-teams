const formatLclFreightRate = ({ fields }) => {
	const newPayload = {
		service_provider_id : fields?.service_provider_id,
		origin_port_id      : fields?.origin_location_id,
		destination_port_id : fields.destination_location_id,
		commodity:
			fields?.commodity === 'all_commodity' ? undefined : fields?.commodity,
	};
	return newPayload;
};
export default formatLclFreightRate;
