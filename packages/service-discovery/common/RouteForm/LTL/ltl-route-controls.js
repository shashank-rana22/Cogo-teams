import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SUPPORTED_COUNTRY_IDS =	GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
	.services.ltl_freight.default_country_ids;

const ltlRouteControls = [
	{
		label       : 'Origin Location',
		type        : 'async-select',
		name        : 'origin_location_id',
		placeholder : 'City/Port/Airport/Pincode',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		isClearable : true,
		params      : {
			apply_sorting : false,
			filters       : {
				type       : ['pincode', 'seaport', 'airport', 'city', 'warehouse'],
				country_id : SUPPORTED_COUNTRY_IDS,
			},
		},
		rules: { required: 'Origin Location is required' },
	},
	{
		label       : 'Destination Location',
		name        : 'destination_location_id',
		placeholder : 'City/Port/Airport/Pincode',
		isClearable : true,
		type        : 'async-select',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		params      : {
			apply_sorting : false,
			filters       : {
				type       : ['pincode', 'seaport', 'airport', 'city', 'warehouse'],
				country_id : SUPPORTED_COUNTRY_IDS,
			},
		},
		rules: { required: 'Destination Location is required' },
	},
];

export default ltlRouteControls;
