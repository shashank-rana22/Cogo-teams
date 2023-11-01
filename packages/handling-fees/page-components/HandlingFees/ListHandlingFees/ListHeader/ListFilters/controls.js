import BOOKING_SOURCE_MAPPING from '../../../../../configs/BOOKING_SOURCE_MAPPING.json';
import rateTypeOptions from '../../../../../configs/rate-type-options';

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
		label       : 'Rate Type',
		name        : 'rate_type',
		type        : 'select',
		placeholder : 'Select Rate Type',
		options     : rateTypeOptions,
		span        : 6,
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
