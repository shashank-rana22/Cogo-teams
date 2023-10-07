const formatTrailerFreightRate = ({ fields }) => {
	const newPayload = {
		service_provider_id     : fields?.service_provider,
		origin_locaiton_id      : fields?.origin,
		destination_location_id : fields?.destination,
		container_size          : fields?.container_size,
		container_type          : fields?.container_type,
	};
	return newPayload;
};
export default formatTrailerFreightRate;
