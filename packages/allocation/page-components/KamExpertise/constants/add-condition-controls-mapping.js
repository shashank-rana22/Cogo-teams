const CONTROL_MAPPING = {
	percentage: [{
		name               : 'milestones',
		label              : 'Enter milestones (%) and score allocated at each milestone',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'percentage',
				type        : 'number',
				label       : 'Milestone',
				placeholder : '0',
				rules       : { required: 'Milestone is required' },
				min         : 0,
			},
			{
				name        : 'score',
				type        : 'number',
				label       : 'Score',
				placeholder : '0',
				rules       : { required: 'Score is required' },
				min         : 0,
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
				name        : 'lower',
				type        : 'number',
				label       : 'From',
				placeholder : '0',
				rules       : { required: 'From is required' },
				min         : 0,
			},
			{
				name        : 'upper',
				type        : 'number',
				label       : 'To',
				placeholder : '0',
				rules       : { required: 'To is required' },
				min         : 0,
			},
			{
				name        : 'score',
				type        : 'number',
				label       : 'Score',
				placeholder : '0',
				rules       : { required: 'Score is required' },
				min         : 0,
			},
		],
	}],
	absolute: [{
		name        : 'first_completion',
		type        : 'number',
		label       : 'Score on Completion',
		placeholder : '0',
		rules       : { required: 'Score on Completion is required' },
		min         : 0,
	},
	{
		name        : 'second_completion',
		type        : 'number',
		label       : 'Score on Repetition',
		placeholder : '0',
		rules       : { required: 'Score on Repetition is required' },
		min         : 0,
	},
	],
};

export default CONTROL_MAPPING;
