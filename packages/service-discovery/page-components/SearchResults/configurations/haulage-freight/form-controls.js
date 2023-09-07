import validate from '../../utils/validateNumber';

const haulageControls = () => [
	{
		name               : 'container',
		type               : 'field-array',
		buttonText         : 'Add Another Container',
		noDeleteButtonTill : 1,
		controls           : [
			{
				name           : 'container_size',
				label          : 'Container size',
				type           : 'chips',
				optionsListKey : 'container-sizes',
				span           : 12,
				value          : '20',
				rules          : { required: 'Container size is required' },
			},
			{
				name           : 'container_type',
				label          : 'Type of Container',
				type           : 'chips',
				optionsListKey : 'container-types',
				span           : 12,
				value          : 'standard',
				rules          : { required: 'Container type is required' },
			},
			{
				label         : 'Commodity',
				name          : 'commodity',
				type          : 'select',
				// optionsListKey : 'commodities',
				commodityType : 'local',
				span          : 12,
				// value         : 'general',
				rules         : { required: 'Commodity is required' },
			},
			{
				name     : 'total_weight',
				label    : 'Total Weight per Ctr.',
				subLabel : 'Max Weight = 26 MT. Overweight charges applicable after 20 MT.',
				span     : 6,
				controls : [
					{
						name  : 'cargo_weight_per_container',
						type  : 'input',
						span  : 6,
						value : 18,
						rules : {
							required : 'Weight is required',
							validate : (val) => validate(val),
							max      : 30,
							min      : 0.1,
						},
					},
					// {
					// 	name        : 'weight_unit',
					// 	type        : 'select',
					// 	placeholder : 'Select Unit',
					// 	span        : 5,
					// 	value       : 'mt',
					// 	options     : [
					// 		{
					// 			label : 'MT',
					// 			value : 'mt',
					// 		},
					// 	],
					// 	rules: { required: 'Weight is required' },
					// },
				],
			},
			{
				name        : 'containers_count',
				label       : 'Count',
				type        : 'input',
				placeholder : 'Enter Count',
				span        : 5,
				value       : 1,
				rules       : {
					required : 'Count is required',
					validate : (val) => validate(val),
					max      : 10000,
					min      : 1,
				},
			},
		],
	},
];

export default haulageControls;
