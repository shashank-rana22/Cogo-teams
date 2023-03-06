const controls = [
	{
		name        : 'condition_type',
		label       : 'Condition Parameter (event)',
		placeholder : '',
		type        : 'select', // Todo list-api from backend with async creatable select
		options     : [
			{ value: 'reactivation', label: 'Reactivation' },
			{ value: 'enrichment', label: 'Enrichment' },
			{ value: 'persona', label: 'Persona' },
			{ value: 'conversion', label: 'Conversion' },
			{ value: 'conversion_time', label: 'Conversion Time' },
			{ value: 'retention', label: 'Retention' },
			{ value: 'collection', label: 'Collection' },
			{ value: 'wallet_share_increase', label: 'Wallet Share Increase' },
			{ value: 'industry', label: 'Industry' },
			{ value: 'country', label: 'Country' },
			{ value: 'churn', label: 'Churn/Bad Customer Experience' },
		],
		rules: {
			required: 'Condition Parameter is required',
		},
		// isClearable: true,
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
		// isClearable: true,
	},
	{
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
	},
	{
		name               : 'tat',
		label              : 'Enter duration (days) and score allocated on completion',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'from',
				type        : 'number',
				label       : 'From',
				placeholder : '0',
				rules       : { required: 'From is required' },
			},
			{
				name        : 'to',
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
	},
	{
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
	{
		name        : 'score_reduced_on_churn',
		type        : 'number',
		label       : 'Score reduced on churn',
		placeholder : '0',
		rules       : { required: 'Score on Repetition is required' },
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
