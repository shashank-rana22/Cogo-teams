import { isEmpty, startCase } from '@cogoport/utils';

const getDiscountControls = ({ isCreate = false, unit = '' }) => [
	{
		name        : 'service_name',
		label       : 'Service Name',
		placeholder : 'Enter Value',
		size        : 'sm',
		type        : 'text',
		showEle     : isCreate,
		rules       : { required: true },
	},
	{
		name        : 'config_type',
		label       : 'Config Type',
		placeholder : 'Enter Value',
		size        : 'sm',
		type        : 'text',
		showEle     : isCreate,
		rules       : { required: true },
	},
	{
		name        : 'value',
		label       : 'Value',
		placeholder : 'Enter Value',
		suffix      : !isEmpty(unit) ? startCase(unit) : '',
		size        : 'sm',
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'usage_count',
		label       : 'Usage Count',
		placeholder : 'Enter usage count',
		size        : 'sm',
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'metadata',
		label       : 'Metadata',
		placeholder : 'Enter metadata',
		size        : 'sm',
		type        : 'textarea',
		rows        : 3,
	},
	{
		name        : 'condition',
		label       : 'Conditions',
		placeholder : 'Enter Conditions',
		size        : 'sm',
		rows        : 3,
		type        : 'textarea',
	},
	{
		name    : 'is_active',
		label   : 'Status',
		type    : 'radioGroup',
		options : [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }],
		rules   : { required: true },
	},
];

export default getDiscountControls;
