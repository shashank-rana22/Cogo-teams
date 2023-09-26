import { FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING, HAZ_CLASSES } from '@cogoport/globalization/constants/commodities';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getServiceWisePayload = ({ additionalFormInfo, detail, service_name = '', tradeType = '' }) => {
	const {
		origin_warehouse_id = '',
		destination_warehouse_id = '',
		destination_cargo_handling_type = '',
		origin_cargo_handling_type = '',
		cargo_value_currency = '',
		cargo_value = '',
		truck_type = '',
		trucks_count = '',
		haulage_type = '',
		import_fcl_cfs_cargo_handling_type = '',
	} = additionalFormInfo;

	const { bls_count = '', service_details = {}, service_type = '' } = detail;

	const primaryServicesObj = Object.values(service_details).filter((item) => item.service_type === service_type);

	const TRADE_TYPE_MAPPING = {
		export: {
			destination_location_id : detail?.origin_port_id,
			origin_location_id      : origin_warehouse_id,
			port_id                 : detail?.origin_port_id,
			trade_type              : 'export',
			cargo_handling_type     : origin_cargo_handling_type,
		},
		import: {
			destination_location_id : destination_warehouse_id,
			origin_location_id      : detail?.destination_port_id,
			port_id                 : detail?.destination_port_id,
			trade_type              : 'import',
			cargo_handling_type     : destination_cargo_handling_type || import_fcl_cfs_cargo_handling_type,
		},
	};

	const {
		destination_location_id = '',
		origin_location_id = '',
		port_id,
		trade_type,
		cargo_handling_type,
	} = TRADE_TYPE_MAPPING[tradeType];

	const commodity = primaryServicesObj?.[GLOBAL_CONSTANTS.zeroth_index].commodity;

	const MAPPING = {
		trailer_freight: primaryServicesObj.map((item) => ({
			origin_location_id,
			destination_location_id,
			container_size : item.container_size,
			container_type : item.container_type,
			commodity      : item?.commodity && HAZ_CLASSES.includes(item.commodity)
				? item.commodity : null,
			containers_count           : item.containers_count,
			cargo_weight_per_container : item.cargo_weight_per_container,
			status                     : 'active',
			service_type               : service_name,
			trade_type,
		})),
		ftl_freight: [{
			origin_location_id,
			destination_location_id,
			commodity : commodity && HAZ_CLASSES.includes(commodity) ? commodity : null,
			status    : 'active',
			trade_type,
			trucks_count,
			truck_type,
			volume    : 1,
			weight    : 1,
			trip_type : 'one_Way',
		}],
		fcl_freight_local: primaryServicesObj.map((item) => ({
			port_id,
			container_size : item.container_size,
			container_type : item.container_type,
			commodity      : item?.commodity && item?.commodity !== 'all_commodity'
				? item?.commodity : 'general',
			containers_count           : item.containers_count,
			bls_count,
			cargo_weight_per_container : item.cargo_weight_per_container,
			status                     : 'active',
			trade_type,
			// cargo_handling_type,
		})),
		haulage_freight: primaryServicesObj.map((item) => ({
			origin_location_id,
			destination_location_id,
			container_size : item.container_size,
			container_type : item.container_type,
			commodity      : item?.commodity && HAZ_CLASSES.includes(item.commodity)
				? item.commodity : null,
			containers_count           : item.containers_count,
			cargo_weight_per_container : item.cargo_weight_per_container,
			haulage_type               : haulage_type || 'carrier',
			status                     : 'active',
			trade_type,
			service_type               : 'trailer_freight',
			transport_mode             : 'rail',
		})),
		fcl_cfs: primaryServicesObj.map((item) => {
			const commodities = FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING[item.container_type] || [];

			return {
				port_id,
				container_size : item.container_size,
				container_type : item.container_type,
				commodity      : item?.commodity !== 'all_commodity'
				&& commodities.includes(item.commodity) ? item.commodity : null,
				containers_count : item.containers_count,
				bls_count,
				status           : 'active',
				trade_type,
				cargo_handling_type,
				cargo_value,
				cargo_value_currency,
			};
		}),
		fcl_customs: primaryServicesObj.map((item) => {
			const commodities = FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING[item.container_type] || [];

			return {
				port_id,
				container_size : item.container_size,
				container_type : item.container_type,
				commodity      : item?.commodity !== 'all_commodity'
				&& commodities.includes(item.commodity) ? item.commodity : null,
				containers_count : item.containers_count,
				bls_count,
				status           : 'active',
				trade_type,
				cargo_handling_type,
			};
		}),
	};

	return MAPPING[service_name];
};

export default getServiceWisePayload;
