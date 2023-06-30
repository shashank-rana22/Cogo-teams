import getIncoterm from './getIncoterm';
import mergeContainerDetails from './mergeContainerDetails';

const getFclPayload = (values, origin, destination) => {
	const { container = [] } = values;

	const payloadArray = [
		...(container || []).map((containerItem) => {
			const {
				cargo_weight_per_container = '',
				commodity = '',
				container_type = '',
				container_size = '',
				containers_count = '',
			} = containerItem;

			return {
				bls_count                  : 1,
				cargo_weight_per_container : Number(cargo_weight_per_container),
				commodity,
				container_size,
				container_type,
				containers_count           : Number(containers_count),
				inco_term                  : getIncoterm(origin, destination),
				destination_port_id        : destination?.id,
				origin_port_id             : origin?.id,
				status                     : 'active',
			};
		}),
	];

	const finalPayload = mergeContainerDetails(payloadArray);

	const payload = {
		fcl_freight_services_attributes: finalPayload,
	};

	return payload;
};

export default getFclPayload;
