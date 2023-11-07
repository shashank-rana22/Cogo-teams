import { isEmpty, startCase } from '@cogoport/utils';

import SERVICE_NAME_OPT from '../constant/serviceNameOption';

const getServiceNameOption = ({ config_type = '' }) => SERVICE_NAME_OPT.filter((ele) => ele.type === config_type);

const getDiscountControls = ({ isCreate = false, watchConfig = '', unit = '', t }) => {
	const serviceNameOpt = getServiceNameOption({ config_type: watchConfig });
	return [
		{
			name        : 'config_type',
			label       : t('saasSubscription:discount_control_type'),
			placeholder : t('saasSubscription:discount_control_type_placeholder'),
			size        : 'sm',
			type        : 'select',
			showEle     : isCreate,
			options     : [{ label: 'Promotion', value: 'promotion' },
				{ label: 'Cancellation', value: 'cancellation' }],
			rules: { required: true },
		},
		{
			name        : 'service_name',
			label       : t('saasSubscription:discount_control_name'),
			placeholder : t('saasSubscription:discount_control_name_placeholder'),
			size        : 'sm',
			type        : 'select',
			showEle     : isCreate,
			disabled    : isEmpty(serviceNameOpt),
			options     : serviceNameOpt,
			rules       : { required: true },
		},
		{
			name        : 'value',
			label       : t('saasSubscription:discount_control_val'),
			placeholder : t('saasSubscription:discount_control_val_placeholder'),
			suffix      : !isEmpty(unit) ? startCase(unit) : 'Percentage',
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
			name        : 'conditions',
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
		{
			name         : 'to_all_subscribers',
			label        : 'To All Subscribers',
			type         : 'toggle',
			onLabel      : 'Yes',
			offLabel     : 'No',
			size         : 'sm',
			showOptional : false,
			showEle      : isCreate,
		},
	];
};

export default getDiscountControls;
