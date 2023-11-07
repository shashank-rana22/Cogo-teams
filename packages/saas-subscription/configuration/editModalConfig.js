export const getDetailsConfig = () => [
	{
		key   : 'plan_details',
		label : 'Plan Details',
	},
	{
		key   : 'account_type',
		label : 'Family',
	},
	{
		key        : 'validity',
		label      : 'Plan Validity',
		renderFunc : 'renderValidity',
	},
];

export const getHeaderConfig = () => [
	{
		key   : 'serial_id',
		label : 'Org Serial Id',
	},
	{
		key   : 'business_name',
		label : 'Business Name',
	},
	{
		key   : 'kyc_status',
		label : 'KYC Status',
	},
];
