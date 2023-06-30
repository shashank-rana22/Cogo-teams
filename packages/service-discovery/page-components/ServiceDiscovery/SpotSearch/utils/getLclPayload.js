import getIncoterm from './getIncoterm';

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
				destination_port_id : destination?.id,
				inco_term           : getIncoterm(origin, destination),
				origin_port_id      : origin?.id,
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
