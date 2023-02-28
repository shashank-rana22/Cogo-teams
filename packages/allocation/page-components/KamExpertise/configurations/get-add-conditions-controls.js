const controls = [
	{
		name        : 'condition_type',
		label       : 'Condition Type (event)',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'reactivation', label: 'Reactivation' },
			{ value: 'enrichment', label: 'Enrichment' },
			{ value: 'persona', label: 'Persona' },
			{ value: 'conversion', label: 'Conversion' },
		],
		rules: {
			required: 'Condition Type is required',
		},
		isClearable: true,
	},
	{
		name        : 'score_type',
		label       : 'Score Type',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'absolute', label: 'Absolute' },
			{ value: 'percentage', label: 'Percentage' },
			{ value: 'tat', label: 'TAT' },
		],
		rules: {
			required: 'Score Type is required',
		},
		isClearable: true,
	},
	{
		// Todo make a field Array
		name    : 'milestones',
		type    : 'fieldArray',
		heading : 'Enter milestones (%) and score allocated at each milestone',
		value   : [
			{
				milestone: '',
			},
		],
		buttonText         : 'Add More',
		noDeleteButtonTill : 0,
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
	},
	{
		name    : 'impact',
		label   : 'Impact',
		type    : 'select',
		options : [
			{ value: 'low', label: 'Low' },
			{ value: 'medium', label: 'Medium' },
			{ value: 'high', label: 'High' },
		],
		rules: {
			required: 'Impact is required',
		},
		isClearable: true,
	},
];

export default controls;
