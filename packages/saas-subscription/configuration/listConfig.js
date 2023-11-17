const getListConfig = ({ t }) => [
	{
		key        : 'serial_id',
		title      : t('saasSubscription:customer_table_serial_id'),
		renderFunc : 'renderId',
		width      : '13%',
	},
	{
		key        : 'business_name',
		title      : t('saasSubscription:customer_table_business_name'),
		renderFunc : 'renderCompanyName',
		width      : '28%',

	},
	{
		key        : 'plan_name',
		title      : t('saasSubscription:customer_table_plan_name'),
		renderFunc : 'renderPlan',
		width      : '18%',

	},
	{
		key        : 'validity_date',
		title      : t('saasSubscription:customer_table_validity_date'),
		renderFunc : 'renderValidity',
		width      : '16%',
	},
	{
		key        : 'family',
		title      : t('saasSubscription:customer_table_family'),
		renderFunc : 'renderFamily',
		width      : '18%',

	},
	{
		key        : 'edit',
		title      : '',
		renderFunc : 'renderEdit',
		width      : '6%',

	},
];

export default getListConfig;
