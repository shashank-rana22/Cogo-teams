const formatLclCustoms = ({ fields }) => {
	const newPayload = {
		location_id         : fields?.location_id,
		trade_type          : fields?.trade_type,
		commodity           : fields?.commodity,
		service_provider_id : fields?.service_provider_id,
	};
	return newPayload;
};
export default formatLclCustoms;
