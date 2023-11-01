import validate from '../../../utils/validateNumber';

const getTrucksControls = ({ setValue = () => {} }) => {
	const TRUCKS_CONTROLS = [
		{
			name               : 'trucks',
			type               : 'fieldArray',
			span               : 12,
			buttonText         : 'Add More',
			noDeleteButtonTill : 1,
			value              : [
				{
					truck        : 'open_body',
					trucks_count : '1',
				},
			],
			controls: [
				{
					name        : 'truck',
					label       : 'Truck Type',
					type        : 'chips',
					placeholder : 'Select truck type',
					value       : 'open_body',
					onChange    : (val, obj, index) => {
						setValue(`trucks[${index}].truck_type`, '');
					},
					options: [
						{
							label : 'Open Body',
							value : 'open_body',
						},
						{
							label : 'Closed Body',
							value : 'closed_body',
						},
					],
					rules: { required: true },

				},
				{
					name        : 'truck_type',
					label       : 'Select Truck',
					type        : 'select',
					span        : 7,
					placeholder : 'Select truck',
					rules       : { required: 'Truck Type is required' },

				},
				{
					name        : 'trucks_count',
					label       : 'Truck Count',
					placeholder : 'Enter count',
					type        : 'input',
					span        : 5,
					rules       : { required: true, validate: (val) => validate(val), min: 0 },
				},
			],
		},
	];

	return TRUCKS_CONTROLS;
};
export default getTrucksControls;
