const EDIT_CONFIG_CONTROLS_MAPPING = {
	score_first_completion:
		{
			name        : 'score_first_completion',
			type        : 'number',
			label       : 'Score credited on first completion',
			placeholder : 'Enter Score',
		},

	score_repetition:
		{
			name        : 'score_repetition',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',
		},

	priority:
		{
			name    : 'priority',
			type    : 'select',
			label   : 'Priority',
			options : [
				{ value: 'high', label: 'High' },
				{ value: 'medium', label: 'Medium' },
				{ value: 'low', label: 'Low' },
			],
			placeholder: 'Select Priority',
		},

	score_controlled_shipment:
		{
			name        : 'score_controlled_shipment',
			type        : 'number',
			label       : 'Score credited on controlled shipment',
			placeholder : 'Enter Score',
		},

	score_unique_lane:
		{
			name        : 'score_unique_lane',
			type        : 'number',
			label       : 'Score credited on Each unique lane',
			placeholder : 'Enter Score',
		},

	score_upto_twenty_five_percent:
		{
			name        : 'score_upto_twenty_five_percent',
			type        : 'number',
			label       : 'Score on 25% completion',
			placeholder : 'Enter Score',
		},

	score_upto_fifty_percent:
		{
			name        : 'score_upto_fifty_percent',
			type        : 'number',
			label       : 'Score on 50% completion',
			placeholder : 'Enter Score',
		},

	score_upto_seventy_five_percent:
		{
			name        : 'score_upto_seventy_five_percent',
			type        : 'number',
			label       : 'Score on 75% completion',
			placeholder : 'Enter Score',

		},

	score_upto_hundred_percent:
		{
			name        : 'score_upto_hundred_percent',
			type        : 'number',
			label       : 'Score on 100% completion',
			placeholder : 'Enter Score',

		},

};

export default EDIT_CONFIG_CONTROLS_MAPPING;
