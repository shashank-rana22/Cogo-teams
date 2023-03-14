const CONTROL_MAPPING = {
	percentage: [{
		name               : 'milestones',
		label              : 'Enter milestones (%) and score allocated at each milestone',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'milestone',
				type        : 'number',
				label       : 'Milestone',
				placeholder : '0',
				rules       : { required: 'Milestone is required' },
			},
			{
				name        : 'score',
				type        : 'number',
				label       : 'Score',
				placeholder : '0',
				rules       : { required: 'Score is required' },
			},
		],
	}],
	tat: [{
		name               : 'tat',
		label              : 'Enter duration (days) and score allocated on completion',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'lower_limit',
				type        : 'number',
				label       : 'From',
				placeholder : '0',
				rules       : { required: 'From is required' },
			},
			{
				name        : 'upper_limit',
				type        : 'number',
				label       : 'To',
				placeholder : '0',
				rules       : { required: 'To is required' },
			},
			{
				name        : 'score',
				type        : 'number',
				label       : 'Score',
				placeholder : '0',
				rules       : { required: 'Score is required' },
			},
		],
	}],
	absolute: [{
		name        : 'score_on_completion',
		type        : 'number',
		label       : 'Score on Completion',
		placeholder : '0',
		rules       : { required: 'Score on Completion is required' },
	},
	{
		name        : 'score_on_repetition',
		type        : 'number',
		label       : 'Score on Repetition',
		placeholder : '0',
		rules       : { required: 'Score on Repetition is required' },
	},
	],
};

export default CONTROL_MAPPING;
