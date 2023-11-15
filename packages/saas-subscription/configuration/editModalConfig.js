export const getDetailsConfig = ({ t }) => [
	{
		key        : 'plan_details',
		label      : t('saasSubscription:details_plan'),
		renderFunc : 'renderPlanName',
	},
	{
		key        : 'account_type',
		label      : t('saasSubscription:details_account'),
		renderFunc : 'renderAccountType',
	},
	{
		key        : 'validity',
		label      : t('saasSubscription:details_validity'),
		renderFunc : 'renderValidity',
	},
];

export const getHeaderConfig = ({ t }) => [
	{
		key        : 'serial_id',
		label      : t('saasSubscription:header_serial_id'),
		renderFunc : 'renderOrgId',
	},
	{
		key   : 'business_name',
		label : t('saasSubscription:header_business_name'),
	},
	{
		key        : 'kyc_status',
		label      : t('saasSubscription:header_kyc'),
		renderFunc : 'renderKyc',
	},
];
