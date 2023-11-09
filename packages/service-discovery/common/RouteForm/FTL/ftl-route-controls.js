import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SUPPORTED_COUNTRY_IDS =	GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
	.services.ftl_freight.default_country_ids;

const ftlRouteControls = [
	{
		label       : 'Origin Location',
		name        : 'origin_location_id',
		placeholder : 'Port/Airport/Pincode/Railway Terminal',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		labelKey    : 'display_name',
		span        : 4,
		isClearable : true,
		params      : {
			apply_sorting : false,
			filters       : {
				type       : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				country_id : SUPPORTED_COUNTRY_IDS,
			},
		},
		initialCall : false,
		rules       : { required: 'Origin Location is required' },
	},
	{
		label       : 'Destination Location',
		name        : 'destination_location_id',
		placeholder : 'Port/Airport/Pincode/Railway Terminal',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		labelKey    : 'display_name',
		span        : 4,
		isClearable : true,
		params      : {
			apply_sorting : false,
			filters       : {
				type       : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				country_id : SUPPORTED_COUNTRY_IDS,
			},
		},
		initialCall : false,
		rules       : { required: 'Destination Location is required' },
	},
];

export default ftlRouteControls;
