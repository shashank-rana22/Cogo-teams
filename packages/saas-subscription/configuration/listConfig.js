const listConfig = [
	{
		key        : 'serial_id',
		title      : 'Id',
		renderFunc : 'renderId',
		width      : '13%',
	},
	{
		key        : 'business_name',
		title      : 'Company Name',
		renderFunc : 'renderCompanyName',
		width      : '28%',

	},
	{
		key        : 'plan_name',
		title      : 'Plan Signed',
		renderFunc : 'renderPlan',
		width      : '20%',

	},
	{
		key        : 'end_date',
		title      : 'End Date',
		renderFunc : 'renderEndDate',
		width      : '12%',

	},
	{
		key        : 'family',
		title      : 'Family',
		renderFunc : 'renderFamily',
		width      : '19%',

	},
	{
		key        : 'edit',
		title      : '',
		renderFunc : 'renderEdit',
		width      : '6%',

	},
];

export default listConfig;
