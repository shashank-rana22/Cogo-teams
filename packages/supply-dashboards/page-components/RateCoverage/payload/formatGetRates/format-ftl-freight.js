const formatFtlFreightRate = ({ fields }) => {
	const newPayload = {
		service_provider_id     : fields?.service_provider,
		origin_location_id      : fields?.origin,
		destination_location_id : fields.destination,
		commodity:
			fields?.commodity === 'all_commodity' ? undefined : fields?.commodity,
		truck_type : fields?.truck_type,
		trip_type  : 'one_way',
	};
	return newPayload;
};
export default formatFtlFreightRate;
