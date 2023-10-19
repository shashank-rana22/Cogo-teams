import CONTAINER_SIZE from '@cogoport/constants/container-sizes.json';
import CONTAINER_TYPE from '@cogoport/constants/container-types.json';
import { LCL_FRIEGHT_COMMODITIES } from '@cogoport/globalization/constants/commodities';

const getFclFreightcontrols = () => [
	{
		name     : 'service_provider_id',
		asyncKey : 'organizations',
		type     : 'async_select',
		label    : 'Service Provider',

		placeholder    : 'Search Via Service Provider',
		defaultOptions : true,

		isClearable : true,
		span        : 12,

	},

	{
		name     : 'partner_id',
		type     : 'async_select',
		label    : 'Cogo Entities',
		asyncKey : 'list_cogo_entity',

		placeholder    : 'Search via cogo entity',
		defaultOptions : true,
		initialCall    : true,

		span        : 12,
		valueKey    : 'id',
		labelKey    : 'business_name',
		isClearable : true,
	},

	{
		name        : 'origin_country_id',
		label       : 'Orgin Port/Country',
		valueKey    : 'id',
		labelKey    : 'name',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['seaport', 'country'] } },
		span        : 12,
		isClearable : true,
	},
	{
		name     : 'destination_country_id',
		label    : 'Destination Port/Country',
		valueKey : 'id',
		labelKey : 'name',

		asyncKey : 'list_locations',
		type     : 'async_select',

		params      : { filters: { type: ['seaport', 'country'] } },
		caret       : true,
		multiple    : false,
		span        : 12,
		isClearable : true,
	},

	{
		name  : 'container_size',
		label : 'Container Size',

		type     : 'select',
		multiple : false,
		options  : CONTAINER_SIZE,

		span        : 12,
		isClearable : true,

	},
	{
		name        : 'container_type',
		label       : 'Container Type',
		type        : 'select',
		multiple    : false,
		options     : CONTAINER_TYPE,
		span        : 12,
		isClearable : true,
	},

	{
		name  : 'commodity',
		label : 'Commodity',
		type  : 'multi_select',

		isClearable : true,
		span        : 12,
		options     : LCL_FRIEGHT_COMMODITIES.map((commodity) => ({
			label : commodity,
			value : commodity,
		})),
	},
	{
		valueKey      : 'id',
		labelKey      : 'company_name',
		asyncKey      : 'list_organization_trade_parties',
		defaultParams : {
			page_limit: 20,
		},
		name: 'importer_exporter_id',

		label : 'Shipper Name',
		type  : 'async_select',

		span        : 12,
		isClearable : true,

	},
	{
		name     : 'shipping_line_id',
		label    : 'Shipping Line',
		labelKey : 'short_name',
		valueKey : 'id',
		type     : 'async_select',
		asyncKey : 'list_operators',

		defaultOptions: true,

		span        : 12,
		isClearable : true,

	},

	{
		name  : 'is_best_price',
		label : 'Is Best Price?',
		Style : { marginTop: '4' },

		type    : 'chips',
		options : [
			{ value: true, label: 'Yes' },
			{ value: false, label: 'No' },
		],
		span        : 12,
		isClearable : true,
	},
	{
		name        : 'Tags_id',
		label       : 'Tags',
		type        : 'select',
		multiple    : false,
		span        : 12,
		isClearable : true,

		options: [

			{ value: 'is_rate_about_to_expire', label: 'Rate Expiring' },
			{ value: 'is_weight_limit_missing', label: 'Weight Slab Missing' },
			{ value: 'is_origin_local_missing', label: 'Origin Local Missing' },
			{
				value : 'is_destination_local_missing',
				label : 'Destination Local Missing',
			},

		],
	},
	{
		name        : 'rate_type',
		label       : 'Rate Type',
		type        : 'select',
		multiple    : false,
		span        : 12,
		isClearable : true,

		options: [

			{ value: 'all_rates', label: 'All Rates' },
			{ value: 'market_place', label: 'Market Place' },
			{ value: 'cogo_assured', label: 'Cogo Assured' },
			{ value: 'promotianal_rates', label: 'Promotional Rates' },
			{ value: 'spot_booking', label: 'Spot Booking' },
		],
	},

];

export default getFclFreightcontrols;
