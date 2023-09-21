import FREQUENCY_MAPPING from '../../../../../configs/FREQUENCY_MAPPING.json';
import ORGANISATION_SUB_TYPE_MAPPING from '../../../../../configs/ORGANISATION_SUB_TYPE_MAPPING.json';
import ORGANISATION_TYPE_MAPPING from '../../../../../configs/ORGANISATION_TYPE_MAPPING.json';
import RATE_SOURCE_MAPPING from '../../../../../configs/RATE_SOURCE_MAPPING.json';
import RULE_TYPE_MAPPING from '../../../../../configs/RULE_TYPE_MAPPING.json';
import TRADE_TYPE_MAPPING from '../../../../../configs/TRADE_TYPE_MAPPING.json';

const controls = () => [
	{
		name        : 'cogo_entity',
		label       : 'Cogo Entity',
		type        : 'async_select',
		placeholder : 'Select Cogo Entity',
		asyncKey    : 'cogo-entities-id',
		initialCall : true,
		labelKey    : 'cogo_entity_name',
		span        : 6,
	},
	{
		label       : 'Rule Type',
		name        : 'rule_type',
		type        : 'select',
		placeholder : 'Select Rule Type',
		options     : RULE_TYPE_MAPPING,
		span        : 6,
	},
	{
		label       : 'Trade Type',
		name        : 'trade_type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : TRADE_TYPE_MAPPING,
		span        : 6,
	},
	{
		label       : 'Rate Source',
		name        : 'rate_source',
		type        : 'select',
		placeholder : 'Select Rate Source',
		options     : RATE_SOURCE_MAPPING,
		span        : 6,
	},
	{
		label       : 'For Organisation',
		name        : 'for_organisation',
		type        : 'async_select',
		placeholder : 'Organisation Name',
		asyncKey    : 'organizations',
		initialCall : true,
		labelKey    : 'for_organisation_name',
		span        : 6,
	},
	{
		label       : 'Organisation Type',
		name        : 'organisation_type',
		type        : 'select',
		placeholder : 'Select Org Type',
		options     : ORGANISATION_TYPE_MAPPING,
		span        : 6,
	},
	{
		label       : 'Organisation Sub-Type',
		name        : 'organisation_sub_type',
		type        : 'select',
		placeholder : 'Select Org Sub Type',
		options     : ORGANISATION_SUB_TYPE_MAPPING,
		span        : 6,
	},
	{
		label       : 'Frequency',
		name        : 'frequency',
		type        : 'select',
		placeholder : 'Select Frequency',
		options     : FREQUENCY_MAPPING,
		span        : 6,
	},
];

export default controls;
