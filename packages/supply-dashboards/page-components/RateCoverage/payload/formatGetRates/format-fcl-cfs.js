const formatFclCfs = ({ fields }) => {
	const newPayload = {
		location_id         : fields?.location_id,
		trade_type          : fields?.trade_type,
		container_size      : fields?.container_size,
		container_type      : fields?.container_type,
		service_provider_id : fields?.service_provider_id,
		cargo_handling_type : fields?.cargo_handling_type,
	};
	return newPayload;
};
export default formatFclCfs;
