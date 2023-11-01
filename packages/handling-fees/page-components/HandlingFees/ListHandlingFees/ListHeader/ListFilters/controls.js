import BOOKING_SOURCE_MAPPING from '../../../../../configs/BOOKING_SOURCE_MAPPING.json';

const controls = [
	{
		name        : 'booking_source',
		label       : 'Booking Source',
		type        : 'select',
		placeholder : 'Select Booking Source',
		options     : BOOKING_SOURCE_MAPPING,
		span        : 6,
	},
	{
		label       : 'Cogo Entity',
		name        : 'cogo_entity_id',
		type        : 'async_select',
		placeholder : 'Select Cogo Entity',
		asyncKey    : 'list_cogo_entity',
		initialCall : true,
		valueKey    : 'id',
		labelKey    : 'business_name',
		span        : 6,
	},
	{
		name        : 'serviceable_country_id',
		label       : 'Country',
		type        : 'async_select',
		initialCall : true,
		asyncKey    : 'list_locations',
		params      : {
			filters: { type: ['country'] },
		},
		defaultOptions : true,
		placeholder    : 'Select Country',
		span           : 6,
	},
	{
		name        : 'organization_type',
		label       : 'Organisation Type',
		type        : 'select',
		placeholder : 'Select Org Type',
		options     : [
			{ label: 'Importer Exporter', value: 'importer_exporter' },
			{ label: 'Channel Partner', value: 'channel_partner' },
		],
		span: 6,
	},
	{
		name        : 'organization_sub_type',
		label       : 'Organisation Sub-Type',
		type        : 'select',
		placeholder : 'Select Org Sub Type',
		options     : [
			{
				label : 'Long Tail',
				value : 'long_tail',
			},
			{
				label : 'Mid Size',
				value : 'mid_size',
			},
			{
				label : 'Enterprise',
				value : 'enterprise',
			},
			{
				label : 'Overseas CP',
				value : 'overseas_cp',
			},
			{
				label : 'Domestic CP',
				value : 'domestic_cp',
			},
		],
		span: 6,
	},
	{
		name        : 'trade_type',
		label       : 'Trade Type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : [
			{ label: 'Import', value: 'import' },
			{ label: 'Export', value: 'export' },
			{ label: 'Domestic', value: 'domestic' },
			{ label: 'Cross country', value: 'cross_country' },
		],
		span: 6,
	},
];

export default controls;
