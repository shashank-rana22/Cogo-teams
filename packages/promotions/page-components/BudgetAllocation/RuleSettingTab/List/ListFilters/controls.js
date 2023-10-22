import FREQUENCY_MAPPING from '../../../../../configs/FREQUENCY_MAPPING.json';
import ORGANISATION_SUB_TYPE_MAPPING from '../../../../../configs/ORGANISATION_SUB_TYPE_MAPPING.json';
import ORGANISATION_TYPE_MAPPING from '../../../../../configs/ORGANISATION_TYPE_MAPPING.json';
import RATE_SOURCE_MAPPING from '../../../../../configs/RATE_SOURCE_MAPPING.json';
import RULE_TYPE_MAPPING from '../../../../../configs/RULE_TYPE_MAPPING.json';
import TRADE_TYPE_MAPPING from '../../../../../configs/TRADE_TYPE_MAPPING.json';

const controls = [
	{
		name        : 'cogo_entity_id',
		label       : 'Cogo Entity',
		type        : 'async_select',
		placeholder : 'Select Cogo Entity',
		asyncKey    : 'list_cogo_entity',
		initialCall : true,
		labelKey    : 'business_name',
		valueKey    : 'id',
		span        : 6,
		isClearable : true,
		size        : 'sm',
	},
	{
		label       : 'Rule Type',
		name        : 'scope',
		type        : 'select',
		placeholder : 'Select Rule Type',
		options     : RULE_TYPE_MAPPING,
		span        : 6,
		size        : 'sm',
	},
	{
		label       : 'Trade Type',
		name        : 'trade_type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : TRADE_TYPE_MAPPING,
		span        : 6,
		size        : 'sm',
	},
	{
		label       : 'Rate Source',
		name        : 'rate_source',
		type        : 'select',
		placeholder : 'Select Rate Source',
		options     : RATE_SOURCE_MAPPING,
		span        : 6,
		size        : 'sm',
	},
	{
		label       : 'For Organisation',
		name        : 'organization_id',
		type        : 'async_select',
		placeholder : 'Organisation Name',
		asyncKey    : 'organizations',
		initialCall : true,
		labelKey    : 'business_name',
		valueKey    : 'id',
		renderLabel : (item) => item?.trade_name,
		span        : 6,
		size        : 'sm',
	},
	{
		label       : 'Organisation Type',
		name        : 'organisation_type',
		type        : 'select',
		placeholder : 'Select Org Type',
		options     : ORGANISATION_TYPE_MAPPING,
		span        : 6,
		size        : 'sm',
	},
	{
		label       : 'Organisation Sub-Type',
		name        : 'organisation_sub_type',
		type        : 'select',
		placeholder : 'Select Org Sub Type',
		options     : ORGANISATION_SUB_TYPE_MAPPING,
		span        : 6,
		size        : 'sm',
	},
	{
		label       : 'Frequency',
		name        : 'frequency',
		type        : 'select',
		placeholder : 'Select Frequency',
		options     : FREQUENCY_MAPPING,
		span        : 6,
		size        : 'sm',
	},
];

export default controls;
