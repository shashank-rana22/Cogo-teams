const EDIT_CONFIG_CONTROLS_MAPPING = {
	score_first_completion: [
		{
			name  : 'score_first_completion',
			type  : 'number',
			label : 'Score creadited on first completion',
		},
	],
	score_repetition: [
		{
			name  : 'score_repetition',
			type  : 'number',
			label : 'Score credited on repetition',
		},
	],
	priority: [
		{
			name    : 'priority',
			type    : 'select',
			label   : 'Priority',
			options : [
				{ value: 'high', label: 'High' },
				{ value: 'medium', label: 'Medium' },
				{ value: 'low', label: 'Low' },
			],
		},
	],
	score_controlled_shipment: [
		{
			name  : 'score_controlled_shipment',
			type  : 'number',
			label : 'Score credited on controlled shipment',
		},
	],
	score_unique_lane: [
		{
			name  : 'score_unique_lane',
			type  : 'number',
			label : 'Score credited on Each unique lane',
		},
	],

};

export default EDIT_CONFIG_CONTROLS_MAPPING;
