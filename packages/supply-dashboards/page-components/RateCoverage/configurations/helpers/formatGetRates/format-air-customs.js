const formatAirCustoms = ({ fields }) => {
	const newPayload = {
		airport_id          : fields?.location_id,
		trade_type          : fields?.trade_type,
		service_provider_id : fields?.service_provider_id,
	};
	return newPayload;
};
export default formatAirCustoms;
