import BOOKING_SOURCE_MAPPING from '../../../../configs/BOOKING_SOURCE_MAPPING.json';
import RATE_TYPE_MAPPING from '../../../../configs/RATE_TYPE_MAPPING.json';

const controls = ({ activeService }) => [
	{
		name        : 'booking_source',
		label       : 'Booking Source',
		type        : 'select',
		placeholder : 'Select Booking Source',
		options     : BOOKING_SOURCE_MAPPING,
		span        : 12,
	},
	{
		label       : 'Cogo Entity',
		name        : 'cogo_entity_id',
		type        : 'async_select',
		placeholder : 'Select Cogo Entity',
		asyncKey    : 'list_cogo_entity',
		initialCall : true,
		labelKey    : 'business_name',
		renderLabel : (item) => `${item?.entity_code} ${item?.business_name}`,
		span        : 12,
	},
	{
		label       : 'Rate Source',
		name        : 'rate_source',
		type        : 'select',
		placeholder : 'Select Rate Type',
		options     : RATE_TYPE_MAPPING[activeService],
		span        : 12,
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
		span: 12,
	},
	{
		name        : 'performed_by',
		label       : 'Checkout created by',
		type        : 'select',
		placeholder : 'Select Org Type',
		options     : [
			{ label: 'User', value: 'user' },
			{ label: 'Agent', value: 'agent' },
		],
		span: 12,
	},
];

export default controls;
