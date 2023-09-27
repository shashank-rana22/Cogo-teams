import { isEmpty, startCase } from '@cogoport/utils';

const getDiscountControls = ({ isCreate = false, unit = '', t }) => [
	{
		name        : 'service_name',
		label       : t('saasSubscription:discount_control_name'),
		placeholder : t('saasSubscription:discount_control_name_placeholder'),
		size        : 'sm',
		type        : 'text',
		showEle     : isCreate,
		rules       : { required: true },
	},
	{
		name        : 'config_type',
		label       : t('saasSubscription:discount_control_type'),
		placeholder : t('saasSubscription:discount_control_type_placeholder'),
		size        : 'sm',
		type        : 'text',
		showEle     : isCreate,
		rules       : { required: true },
	},
	{
		name        : 'value',
		label       : t('saasSubscription:discount_control_val'),
		placeholder : t('saasSubscription:discount_control_val_placeholder'),
		suffix      : !isEmpty(unit) ? startCase(unit) : '',
		size        : 'sm',
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'usage_count',
		label       : t('saasSubscription:discount_control_count'),
		placeholder : t('saasSubscription:discount_control_count_placeholder'),
		size        : 'sm',
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'metadata',
		label       : t('saasSubscription:discount_control_metadata'),
		placeholder : t('saasSubscription:discount_control_metadata_placeholder'),
		size        : 'sm',
		type        : 'textarea',
		rows        : 3,
	},
	{
		name        : 'condition',
		label       : t('saasSubscription:discount_control_conditions'),
		placeholder : t('saasSubscription:discount_control_conditions_placeholder'),
		size        : 'sm',
		rows        : 3,
		type        : 'textarea',
	},
	{
		name    : 'is_active',
		label   : t('saasSubscription:discount_control_status'),
		type    : 'radioGroup',
		options : [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }],
		rules   : { required: true },
	},
];

export default getDiscountControls;
