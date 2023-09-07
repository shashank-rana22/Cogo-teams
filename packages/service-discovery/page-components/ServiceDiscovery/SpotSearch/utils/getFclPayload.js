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

	let payload = {
		fcl_freight_services_attributes: finalPayload,
	};

	const { is_icd: isOriginIcd = false, id: originId = '' } = origin;
	const { is_icd: isDestinationIcd = false, id: destinationId = '' } =		destination;

	if (isOriginIcd) {
		payload = {
			...payload,
			haulage_freight_services_attributes: [
				...(payload.haulage_freight_services_attributes || []),
				...finalPayload.map(
					({
						cargo_weight_per_container,
						commodity,
						container_size,
						containers_count,
						container_type,
					}) => ({
						cargo_weight_per_container,
						commodity,
						container_size,
						container_type,
						containers_count,
						origin_location_id : originId,
						status             : 'active',
						trade_type         : 'export',
						transport_mode     : 'rail',
						haulage_type       : 'carrier',
					}),
				),
			],
		};
	}

	if (isDestinationIcd) {
		payload = {
			...payload,
			haulage_freight_services_attributes: [
				...(payload.haulage_freight_services_attributes || []),
				...finalPayload.map(
					({
						cargo_weight_per_container,
						commodity,
						container_size,
						containers_count,
						container_type,
					}) => ({
						cargo_weight_per_container,
						commodity,
						container_size,
						container_type,
						containers_count,
						destination_location_id : destinationId,
						status                  : 'active',
						trade_type              : 'import',
						transport_mode          : 'rail',
						haulage_type            : 'carrier',
					}),
				),
			],
		};
	}

	return payload;
};

export default getFclPayload;
