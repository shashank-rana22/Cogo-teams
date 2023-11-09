export const getDetailsConfig = () => [
	{
		key        : 'plan_details',
		label      : 'Plan Details',
		renderFunc : 'renderPlanName',
	},
	{
		key        : 'account_type',
		label      : 'Family',
		renderFunc : 'renderAccountType',
	},
	{
		key        : 'validity',
		label      : 'Plan Validity',
		renderFunc : 'renderValidity',
	},
];

export const getHeaderConfig = () => [
	{
		key        : 'serial_id',
		label      : 'Org Serial Id',
		renderFunc : 'renderOrgId',
	},
	{
		key   : 'business_name',
		label : 'Business Name',
	},
	{
		key        : 'kyc_status',
		label      : 'KYC Status',
		renderFunc : 'renderKyc',
	},
];
