const scheduleEvents = ({ orgId = '' }) => [
	{
		label       : 'Select Customer',
		name        : 'organization_id',
		placeholder : 'Select here...',
		controlType : 'asyncSelect',
		isClearable : true,
		valueKey    : 'id',
		rules       : { required: 'customer is required' },
		asyncKey    : 'organizations',
		width       : '100%',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	},
	{
		name        : 'organization_user_id',
		label       : 'Select POC',
		controlType : 'asyncSelect',
		placeholder : 'Select here...',
		rules       : { required: 'poc is required' },
		asyncKey    : 'list_organization_users',
		width       : '100%',
		isClearable : true,
		params      : {
			filters: {
				organization_id: orgId,
			},
		},
		initialCall: true,
	},
	{
		name        : 'remarks',
		label       : 'Remarks',
		controlType : 'textarea',
		placeholder : 'Enter Remarks...',
		width       : '100%',
		rows        : 4,
		rules       : { required: 'remarks is required' },
	},
	{
		label       : 'Mark as very important event',
		name        : 'mark_important_event',
		controlType : 'checkbox',
		width       : '100%',
		showLabel   : false,
	},

];

export default scheduleEvents;
