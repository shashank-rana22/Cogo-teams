import CATEGORY_MAPPING from '../../../../configs/CATEGORY_MAPPING.json';
import ORGANISATION_SUB_TYPE_MAPPING from '../../../../configs/ORGANISATION_SUB_TYPE_MAPPING.json';
import ORGANISATION_TYPE_MAPPING from '../../../../configs/ORGANISATION_TYPE_MAPPING.json';
import RATE_SOURCE_MAPPING from '../../../../configs/RATE_SOURCE_MAPPING.json';
import RULE_TYPE_MAPPING from '../../../../configs/RULE_TYPE_MAPPING.json';
import SERVICE_TABS_MAPPING from '../../../../configs/SERVICE_TABS_MAPPING.json';
import TRADE_TYPE_MAPPING from '../../../../configs/TRADE_TYPE_MAPPING.json';

const getControls = ({ disabledCategory = false }) => [
	{
		name        : 'cogo_entity_id',
		label       : 'Cogo Entity',
		type        : 'async_select',
		placeholder : 'Select Cogo Entity',
		asyncKey    : 'list_cogo_entity',
		initialCall : true,
		labelKey    : 'business_name',
		valueKey    : 'id',
		span        : 3,
		isClearable : true,
		rules       : { required: 'Cogo Entity is required' },
		size        : 'sm',
	},
	{
		label       : 'Scope',
		name        : 'scope',
		type        : 'select',
		placeholder : 'Select Rule Type',
		size        : 'sm',
		options     : RULE_TYPE_MAPPING,
		span        : 2,
		rules       : { required: 'Scope is required' },
	},
	{
		label    : 'Category',
		name     : 'category',
		type     : 'select',
		options  : CATEGORY_MAPPING,
		rules    : { required: 'Category is required' },
		disabled : disabledCategory,
		span     : 1.5,
		size     : 'sm',
	},
	{
		label    : 'For Service',
		name     : 'for_service',
		type     : 'select',
		options  : SERVICE_TABS_MAPPING,
		disabled : true,
		span     : 1.5,
		size     : 'sm',
	},
	{
		label       : 'Trade Type',
		name        : 'trade_type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : TRADE_TYPE_MAPPING,
		size        : 'sm',
		span        : 2,
	},
	{
		label       : 'Rate Source',
		name        : 'rate_source',
		type        : 'select',
		placeholder : 'Select Rate Source',
		options     : RATE_SOURCE_MAPPING,
		span        : 2,
		size        : 'sm',
	},
	{
		label       : 'For Organisation',
		name        : 'organization_id',
		type        : 'async_select',
		placeholder : 'Organisation Name',
		asyncKey    : 'organizations',
		labelKey    : 'business_name',
		valueKey    : 'id',
		initialCall : true,
		span        : 3,
		size        : 'sm',
		isClearable : true,
	},
	{
		label       : 'Organisation Type',
		name        : 'organisation_type',
		type        : 'select',
		placeholder : 'Select Org Type',
		options     : ORGANISATION_TYPE_MAPPING,
		span        : 2,
		size        : 'sm',
	},
	{
		label       : 'Organisation Sub-Type',
		name        : 'organisation_sub_type',
		type        : 'select',
		placeholder : 'Select Org Sub Type',
		options     : ORGANISATION_SUB_TYPE_MAPPING,
		span        : 2,
		size        : 'sm',
	},
];

export default getControls;
