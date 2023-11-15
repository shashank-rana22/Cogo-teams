import { HAZ_CLASSES } from '@cogoport/globalization/constants/commodities';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getServiceWisePayload = ({
	additionalFormInfo,
	detail = {},
	service_name = '',
	tradeType = '',
}) => {
	const {
		truck_type = '',
		trucks_count = 0,
		address = '',
		location_id = '',
		expected_cargo_gated_in = '',
		expected_cargo_gated_out = '',
	} = additionalFormInfo;

	const {
		origin_airport_id = '',
		destination_airport_id = '',
		volume = 1,
		weight = 1,
		packages = [],
		packages_count = 1,
		cargo_readiness_date,
		commodity = '',
		commodity_details = [],
		load_selection_type = '',
		payment_type = '',
		cargo_value,
		cargo_value_currency,
		dry_ice_required = false,
		terminal_charge_type = '',
		airline_id = '',
	} = detail;

	const TRADE_TYPE_MAPPING = {
		export: {
			destination_location_id : origin_airport_id,
			origin_location_id      : location_id,
			trade_type              : 'export',
		},
		import: {
			origin_location_id      : destination_airport_id,
			trade_type              : 'import',
			destination_location_id : location_id,
		},
	};

	const {
		destination_location_id = '',
		origin_location_id = '',
		trade_type,
	} = TRADE_TYPE_MAPPING[tradeType];

	const commodityDetails = commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { commodity_type = '', commodity_subtype = '' } = commodityDetails;

	const MAPPING = {
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
			cargo_readiness_date,
			address   : address || undefined,
		}],
		ltl_freight: [{
			origin_location_id,
			destination_location_id,
			cargo_readiness_date,
			commodity:
				commodity && HAZ_CLASSES.includes(commodity)
					? commodity
					: null,
			trade_type : tradeType,
			packages   : (packages || []).map((item) => ({
				...item,
				height         : item.height || 1,
				width          : item.width || 1,
				length         : item.length || volume,
				package_weight : item.package_weight || weight,
			})),
			status  : 'active',
			weight,
			volume,
			address : address || undefined,
		}],
		air_customs: [
			{
				airport_id : tradeType === 'import' ? origin_location_id : destination_location_id,
				commodity  : commodity === 'hazardous' ? 'hazardous' : 'all_commodities',
				packages_count,
				weight,
				volume,
				status     : 'active',
				trade_type : trade_type || 'domestic',
			},
		],
		air_freight_local: [
			{
				airport_id:
					tradeType === 'export'
						? origin_airport_id
						: destination_airport_id,
				trade_type           : tradeType,
				terminal_charge_type : terminal_charge_type || undefined,
				payment_type         : payment_type || undefined,
				cargo_value          : cargo_value || undefined,
				cargo_value_currency : cargo_value_currency || undefined,
				dry_ice_required,
				packages_count       : Number(packages_count),
				weight               : Number(weight),
				volume               : Number(volume),
				status               : 'active',
				commodity            : commodity && commodity !== 'all_commodity' ? commodity : 'general',
				commodity_details,
				packages,
				airline_id,
			},
		],
		warehouse: [{
			location_id,
			trade_type         : tradeType,
			commodity          : commodity && commodity !== 'all_commodity' ? commodity : 'general',
			packages,
			status             : 'active',
			commodity_type     : commodity_type || undefined,
			commodity_sub_type : commodity_subtype || null,
			load_selection_type,
			packages_count,
			expected_cargo_gated_in,
			expected_cargo_gated_out,
			weight,
			volume,
		}],
	};

	return MAPPING[service_name];
};

export default getServiceWisePayload;
