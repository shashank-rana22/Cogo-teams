const formatLtlFreightRate = ({ fields }) => {
	const newPayload = {
		service_provider_id     : fields?.service_provider,
		origin_location_id      : fields?.origin?.origin_value,
		destination_location_id : fields?.destination?.destination_value,
	};
	return newPayload;
};
export default formatLtlFreightRate;
