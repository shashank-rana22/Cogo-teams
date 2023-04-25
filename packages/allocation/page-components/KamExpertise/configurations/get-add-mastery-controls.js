const controls = [
	{
		name        : 'mastery_name',
		label       : 'Mastery Name',
		placeholder : 'Multi Modal',
		type        : 'text',
		rules       : {
			required: 'Mastery name is required',
		},
		isClearable: true,
	},
	{
		name        : 'badges',
		label       : 'Badges',
		placeholder : 'Select',
		type        : 'asyncSelect',
		asyncKey    : 'badge_name',
		multiple    : true,
		initialCall : false,
		isClearable : true,
		params      : {
			filters: {
				status                       : 'active',
				expertise_configuration_type : 'event_configuration',
			},
		},
		rules: {
			required: 'Select a Badge',
		},
		styles: {
			width: '200px',
		},
	},
];

export default controls;
