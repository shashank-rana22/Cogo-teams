const formatFclCustoms = ({ fields }) => {
	const newPayload = {
		location_id         : fields?.location_id,
		trade_type          : fields?.trade_type,
		container_size      : fields?.container_size,
		container_type      : fields?.container_type,
		service_provider_id : fields?.service_provider_id,
	};
	return newPayload;
};
export default formatFclCustoms;
