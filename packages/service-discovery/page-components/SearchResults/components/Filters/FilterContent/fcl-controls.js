const fclControls = () => {
	const controls = [
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
					label          : 'Commodity',
					name           : 'commodity',
					type           : 'select',
					optionsListKey : 'commodities',
					commodityType  : 'freight',
					span           : 12,
					value          : 'general',
					rules          : { required: 'Commodity is required' },
				},
				{
					name     : 'total_weight',
					label    : 'Total Weight per Ctr.',
					subLabel : 'Max Weight = 26 MT. Overweight charges applicable after 20 MT.',
					span     : 6,
					controls : [
						{
							name  : 'cargo_weight_per_container',
							type  : 'number',
							span  : 5,
							value : 1,
							max   : 30,
							min   : 0.1,
							rules : { required: 'Weight is required' },
						},
						{
							name        : 'weight_unit',
							type        : 'select',
							placeholder : 'Select Unit',
							span        : 6,
							value       : 'mt',
							options     : [
								{
									label : 'MT',
									value : 'mt',
								},
							],
							rules: { required: 'Weight is required' },
						},
					],
				},
				{
					name        : 'containers_count',
					label       : 'Count',
					type        : 'number',
					placeholder : 'Enter Count',
					span        : 5,
					value       : 1,
					max         : 1000,
					min         : 1,
					rules       : { required: 'Count is required' },
				},
			],
		},
	];

	return controls;
};
export default fclControls;
