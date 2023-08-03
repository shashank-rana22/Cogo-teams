import getLocationInfo from '../../../../page-components/SearchResults/utils/locations-search';

const NULL_COMMODITIES = ['general', 'all', 'all_commodities'];

const getRequiredFilters = ({ detail = {}, service, trade_type, rateCardData }) => {
	const { origin, destination } = getLocationInfo(detail, 'service_type');

	const { shipping_line_id = '' } = rateCardData;

	const { commodity, container_size, container_type } = detail;

	const finalCommodity = NULL_COMMODITIES.includes(commodity) ? null : commodity;

	const FILTERS_MAPPING = {
		export_ftl_freight: {
			origin_location_id      : '',
			destination_location_id : origin?.id,
		},
		export_trailer_freight: {
			origin_location_id      : '',
			destination_location_id : origin?.id,
		},
		export_fcl_customs: {
			trade_type,
			location_id : origin?.id,
			country_id  : origin?.country_id,
			commodity   : finalCommodity,
			container_size,
			container_type,
		},
		export_fcl_cfs: {
			trade_type,
			location_id : origin?.id,
			country_id  : origin?.country_id,
			commodity   : finalCommodity,
			container_size,
			container_type,
		},
		export_fcl_freight_local: {
			trade_type,
			port_id    : origin?.id,
			country_id : origin?.country_id,
			container_size,
			container_type,
			commodity  : finalCommodity,
			shipping_line_id,
		},
		fcl_freight: {
			origin_port_id         : origin?.id,
			origin_country_id      : origin?.country_id,
			destination_port_id    : destination?.id,
			destination_country_id : destination?.country_id,
			shipping_line_id,
			container_size,
			container_type,
			commodity,
		},
		import_fcl_freight_local: {
			trade_type,
			port_id    : destination?.id,
			country_id : destination?.country_id,
			container_size,
			container_type,
			commodity  : finalCommodity,
			shipping_line_id,
		},
		import_fcl_cfs: {
			trade_type,
			location_id : destination?.id,
			country_id  : destination?.country_id,
			commodity   : finalCommodity,
			container_size,
			container_type,
		},
		import_fcl_customs: {
			trade_type,
			location_id : destination?.id,
			country_id  : destination?.country_id,
			commodity   : finalCommodity,
			container_size,
			container_type,
		},
		import_ftl_freight: {
			origin_location_id: destination?.id,
		},
		import_trailer_freight: {
			origin_location_id: destination?.id,
		},
	};

	return FILTERS_MAPPING[service] || {};
};
export default getRequiredFilters;
