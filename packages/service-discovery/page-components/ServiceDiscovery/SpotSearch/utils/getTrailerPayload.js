import mergeContainerDetails from './mergeContainerDetails';

const getTrailerPayload = (values, origin, destination) => {
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
				cargo_weight_per_container : Number(cargo_weight_per_container),
				commodity                  : commodity === 'all_commodity' ? null : commodity,
				container_size,
				container_type,
				containers_count           : Number(containers_count),
				destination_location_id    : destination?.id,
				origin_location_id         : origin?.id,
				status                     : 'active',
				trade_type                 : 'domestic',
				transport_mode             : 'trailer',
				trip_type                  : 'one_way',
			};
		}),
	];

	const finalPayload = mergeContainerDetails(payloadArray);

	const payload = {
		trailer_freight_services_attributes: finalPayload,
	};

	return payload;
};

export default getTrailerPayload;
