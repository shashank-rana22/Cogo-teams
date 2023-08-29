const getEditQuotaControl = ({ t }) => [
	{
		name    : 'action',
		label   : t('saasSubscription:edit_config_action'),
		type    : 'radioGroup',
		options : [
			{ label: t('saasSubscription:edit_config_action_label_1'), value: 'credit' },
			{ label: t('saasSubscription:edit_config_action_label_2'), value: 'debit' },
			{ label: t('saasSubscription:edit_config_action_label_3'), value: 'reset' },
		],
		rules: {
			required: true,
		},
	},
	{
		name        : 'quantity',
		label       : t('saasSubscription:edit_config_quantity'),
		size        : 'sm',
		type        : 'number',
		placeholder : t('saasSubscription:edit_config_quantity'),
		rules       : {
			required : true,
			min      : {
				value   : -1,
				message : t('saasSubscription:edit_config_quantity_err'),
			},
		},
	},
	{
		name    : 'is_addon',
		label   : t('saasSubscription:edit_config_is_addon'),
		type    : 'radioGroup',
		options : [
			{ label: t('saasSubscription:edit_config_is_addon_true'), value: 'true' },
			{ label: t('saasSubscription:edit_config_is_addon_false'), value: 'false' },
		],
		rules: {
			required: true,
		},
	},
];

export default getEditQuotaControl;
