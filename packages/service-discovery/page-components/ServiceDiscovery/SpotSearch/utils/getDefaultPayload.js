import { addDays } from '@cogoport/utils';

const getPayload = (serviceType, origin, destination) => {
	const COMMON_PAYLOAD_MAPPING = {
		fcl_freight: {
			bls_count                  : 1,
			cargo_weight_per_container : 18,
			commodity                  : 'general',
			container_size             : '20',
			container_type             : 'standard',
			containers_count           : 1,
			inco_term                  : 'fob',
			destination_port_id        : destination,
			origin_port_id             : origin,
			status                     : 'active',
		},
		lcl_freight: {
			bls_count           : 1,
			commodity           : 'general',
			destination_port_id : destination,
			inco_term           : 'fob',
			origin_port_id      : origin,
			packages_count      : 1,
			volume              : 1,
			weight              : 1,
			status              : 'active',
		},
		air_freight: {
			cargo_clearance_date   : addDays(new Date(), 1),
			commodity              : 'general',
			commodity_details      : [{ commodity_type: 'all' }],
			destination_airport_id : destination,
			dry_ice_required       : false,
			inco_term              : 'cif',
			origin_airport_id      : origin,
			load_selection_type    : 'cargo_gross',
			packages_count         : 1,
			packages               : [
				{
					handling_type  : 'stackable',
					packages_count : 1,
					packing_type   : 'box',
				},
			],
			payment_type : 'prepaid',
			weight       : 1,
			volume       : 1,
			status       : 'active',
		},
		ftl_freight: {
			cargo_readiness_date                        : addDays(new Date(), 1),
			commodity                                   : null,
			ftl_freight_service_touch_points_attributes : [
				{
					sequence_number         : 1,
					touch_point_location_id : origin,
					touch_point_type        : 'origin',
				},
				{
					sequence_number         : 1,
					touch_point_location_id : destination,
					touch_point_type        : 'destination',
				},
			],
			load_selection_type : 'truck',
			packages            : [
				{
					handling_type  : 'stackable',
					height         : 1,
					length         : 1,
					width          : 1,
					package_weight : 1,
					packages_count : 1,
					packing_type   : 'box',
				},
			],
			truck_type              : 'open_body_pickup_1ton',
			trucks_count            : 1,
			destination_location_id : destination,
			origin_location_id      : origin,
			status                  : 'active',
			trade_type              : 'domestic',
			trip_type               : 'one_way',
		},
		ltl_freight: {
			cargo_readiness_date    : addDays(new Date(), 1),
			commodity               : null,
			load_selection_type     : 'cargo_gross',
			destination_location_id : destination,
			origin_location_id      : origin,
			packages                : [
				{
					handling_type  : 'stackable',
					height         : 1,
					length         : 1,
					package_weight : 1,
					packages_count : 1,
					packing_type   : 'pallet',
					width          : 1,
				},
			],
			status     : 'active',
			trade_type : 'domestic',
			volume     : 1,
			weight     : 1,
		},
		trailer_freight: {
			cargo_weight_per_container : 18,
			commodity                  : null,
			container_size             : '20',
			container_type             : 'standard',
			containers_count           : 1,
			destination_location_id    : destination,
			origin_location_id         : origin,
			status                     : 'active',
			trade_type                 : 'domestic',
			transport_mode             : 'trailer',
			trip_type                  : 'one_way',
		},
		haulage_freight: {
			cargo_weight_per_container : 18,
			commodity                  : null,
			container_size             : '20',
			container_type             : 'standard',
			containers_count           : 1,
			destination_location_id    : destination,
			origin_location_id         : origin,
			status                     : 'active',
			trade_type                 : 'domestic',
			transport_mode             : 'rail',
		},
	};

	return COMMON_PAYLOAD_MAPPING[serviceType];
};

const getDefaultPayload = ({
	service_type = '',
	origin = '',
	destination = '',
}) => {
	const payloadObject = {
		...getPayload(service_type, origin, destination),
	};

	const payloadKey = [service_type, 'services_attributes'].join('_');

	const payload = { [payloadKey]: [payloadObject] };

	return payload || {};
};

export default getDefaultPayload;
