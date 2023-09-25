import { addDays } from '@cogoport/utils';

import getFormattedTouchPointDataPayload from './getFormattedTouchPointDataPayload';
import getIncoterm from './getIncoterm';

const PLUS_ONE_DAY = 1;

const getPayload = ({ serviceType, origin = {}, destination = {}, ftlFormData = {} }) => {
	const incoTerm = getIncoterm(origin, destination);

	const { id: originId = '' } = origin || {};

	const { id: destinationId = '' } = destination || {};

	const { typeOfJourney = '' } = ftlFormData || {};

	const ftl_touch_points = getFormattedTouchPointDataPayload({
		...ftlFormData,
		location: {
			origin,
			destination,
		},
	});

	const COMMON_PAYLOAD_MAPPING = {
		fcl_freight: {
			bls_count                  : 1,
			cargo_weight_per_container : 18,
			commodity                  : 'general',
			container_size             : '20',
			container_type             : 'standard',
			containers_count           : 1,
			inco_term                  : incoTerm,
			destination_port_id        : destinationId,
			origin_port_id             : originId,
			status                     : 'active',
		},
		lcl_freight: {
			bls_count           : 1,
			commodity           : 'general',
			destination_port_id : destinationId,
			inco_term           : incoTerm,
			origin_port_id      : originId,
			packages_count      : 1,
			volume              : 1,
			weight              : 1,
			status              : 'active',
		},
		air_freight: {
			cargo_clearance_date   : addDays(new Date(), PLUS_ONE_DAY),
			commodity              : 'general',
			commodity_details      : [{ commodity_type: 'all' }],
			destination_airport_id : destinationId,
			dry_ice_required       : false,
			inco_term              : incoTerm,
			origin_airport_id      : originId,
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
			cargo_readiness_date                        : addDays(new Date(), PLUS_ONE_DAY),
			commodity                                   : null,
			ftl_freight_service_touch_points_attributes : ftl_touch_points,
			load_selection_type                         : 'truck',
			packages                                    : [],
			truck_type                                  : 'open_body_pickup_1ton',
			trucks_count                                : 1,
			destination_location_id                     : destinationId,
			origin_location_id                          : originId,
			status                                      : 'active',
			trade_type                                  : 'domestic',
			trip_type                                   : typeOfJourney || 'one_way',
		},
		ltl_freight: {
			cargo_readiness_date    : addDays(new Date(), PLUS_ONE_DAY),
			commodity               : null,
			load_selection_type     : 'cargo_gross',
			destination_location_id : destinationId,
			origin_location_id      : originId,
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
			destination_location_id    : destinationId,
			origin_location_id         : originId,
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
			destination_location_id    : destinationId,
			origin_location_id         : originId,
			status                     : 'active',
			trade_type                 : 'domestic',
			transport_mode             : 'rail',
		},
	};

	return COMMON_PAYLOAD_MAPPING[serviceType];
};

const getDefaultPayload = ({
	service_type = '',
	origin = {},
	destination = {},
	ftlFormData = {},
}) => {
	const { is_icd:isOriginIcd = false, id: originId = '' } = origin;
	const { is_icd:isDestinationIcd = false, id: destinationId = '' } = destination;

	const payloadObject = {
		...getPayload({ serviceType: service_type, origin, destination, ftlFormData }),
	};

	const payloadKey = [service_type, 'services_attributes'].join('_');

	let payload = { [payloadKey]: [payloadObject] };

	if (isOriginIcd && service_type === 'fcl_freight') {
		payload = {
			...payload,
			haulage_freight_services_attributes:
			[...(payload.haulage_freight_services_attributes || []),
				{
					cargo_weight_per_container : 18,
					commodity                  : null,
					container_size             : '20',
					container_type             : 'standard',
					containers_count           : 1,
					origin_location_id         : originId,
					status                     : 'active',
					trade_type                 : 'export',
					transport_mode             : 'rail',
					haulage_type               : 'carrier',
				}],
		};
	}

	if (isDestinationIcd && service_type === 'fcl_freight') {
		payload = {
			...payload,
			haulage_freight_services_attributes:
			[...(payload.haulage_freight_services_attributes || []),
				{
					cargo_weight_per_container : 18,
					commodity                  : null,
					container_size             : '20',
					container_type             : 'standard',
					containers_count           : 1,
					destination_location_id    : destinationId,
					status                     : 'active',
					trade_type                 : 'import',
					transport_mode             : 'rail',
					haulage_type               : 'carrier',
				}],
		};
	}

	return payload || {};
};

export default getDefaultPayload;
