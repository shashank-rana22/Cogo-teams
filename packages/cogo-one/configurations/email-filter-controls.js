const FILTER_CONTROLS = [
	{
		label          : '',
		name           : 'status',
		controllerType : 'radio',
		className      : 'status_field_controller',
		value          : '',
		options        : [
			{
				label : 'Unread',
				value : 'unread',
			},
			{
				label : 'All',
				value : 'all',
			},
		],
	},
	{
		label          : 'Assigned To',
		name           : 'assigned_to',
		controllerType : 'radio',
		value          : '',
		className      : 'escalation_field_controller',
		options        : [
			{
				label : 'Me',
				value : 'me',
			},
			{
				label : 'Agent',
				value : 'agent',
			},

		],
	},
	{
		label          : '',
		name           : 'assigned_agent',
		controllerType : 'asyncSelect',
		asyncKey       : 'list_chat_agents',
		initialCall    : true,
		value          : '',
		className      : 'escalation_field_controller',
		placeholder    : 'Select Agent',
		rules          : {
			required: 'This is Requied',
		},
	},
	{
		label          : 'User Email',
		name           : 'user_email',
		controllerType : 'input',
		className      : 'status_field_controller',
		value          : '',
	},
	{
		label          : 'SID',
		name           : 'shipment_serial_id',
		controllerType : 'input',
		className      : 'status_field_controller',
		value          : '',
	},
];

export default FILTER_CONTROLS;
