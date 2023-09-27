const getCreatePlanControl = ({ t }) => [
	{
		name        : 'organization_id',
		label       : t('saasSubscription:assign_plan_config_org'),
		type        : 'asyncSelect',
		placeholder : t('saasSubscription:assign_plan_config_org'),
		asyncKey    : 'organizations',
		initialCall : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'display_name',
		label       : t('saasSubscription:assign_plan_config_display'),
		type        : 'text',
		placeholder : t('saasSubscription:assign_plan_config_display_placeholder'),
		rules       : {
			required: true,
		},
	},
	{
		name        : 'description',
		label       : t('saasSubscription:assign_plan_config_desc'),
		type        : 'text',
		placeholder : t('saasSubscription:assign_plan_config_desc_placeholder'),
	},
	{
		name   : 'pricing',
		type   : 'pricing',
		config : [
			{
				key   : 'currency',
				title : t('saasSubscription:assign_plan_config_currency'),
				width : '25%',
			},
			{
				key   : 'period',
				title : t('saasSubscription:assign_plan_config_frequency'),
				width : '35%',
			},
			{
				key        : 'price',
				title      : t('saasSubscription:assign_plan_config_price'),
				width      : '40%',
				renderFunc : 'renderPrice',
			},
			{
				key        : 'active',
				title      : '',
				width      : '20%',
				renderFunc : 'renderCheck',
			},
		],
	},
	{
		name  : 'addons',
		type  : 'fieldArray',
		value : [
			{
				product_id : '',
				count      : 0,
				discount   : 0,
			},
		],
		controls: [
			{
				name        : 'product_id',
				type        : 'asyncSelect',
				asyncKey    : 'addon_list',
				placeholder : t('saasSubscription:assign_plan_config_name_placeholder'),
				size        : 'sm',
				width       : '40%',
				initialCall : true,
				rules       : {
					required: true,
				},
			},
			{
				name        : 'count',
				type        : 'number',
				placeholder : t('saasSubscription:assign_plan_config_count_placeholder'),
				size        : 'sm',
				width       : '25%',
				rules       : {
					required : true,
					min      : {
						value   : -1,
						message : t('saasSubscription:assign_plan_config_count_err_msg'),
					},
				},
			},
			{
				name        : 'discount',
				type        : 'number',
				placeholder : t('saasSubscription:assign_plan_config_discount_placeholder'),
				size        : 'sm',
				width       : '25%',
				rules       : {
					required : true,
					min      : {
						value   : 0,
						message : t('saasSubscription:assign_plan_config_discount_err_msg'),
					},
				},
			},
		],
	},
];

export default getCreatePlanControl;
