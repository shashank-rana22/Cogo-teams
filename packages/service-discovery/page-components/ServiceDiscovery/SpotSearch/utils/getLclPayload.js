const getLclPayload = (values, origin, destination) => {
	const {
		commodity = '',
		packages_count = '',
		volume = '',
		weight = '',
	} = values;

	const payload = {
		lcl_freight_services_attributes: [
			{
				bls_count           : 1,
				commodity,
				destination_port_id : destination,
				inco_term           : 'fob',
				origin_port_id      : origin,
				packages_count      : Number(packages_count),
				volume              : Number(volume),
				weight              : Number(weight),
				status              : 'active',
			},
		],
	};

	return payload;
};

export default getLclPayload;
