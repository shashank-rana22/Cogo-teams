import getGeoConstants from '@cogoport/globalization/constants/geo';

import validate from '../../../utils/validateNumber';

const getTrucksControls = () => {
	const geo = getGeoConstants();

	const TRUCKS_CONTROLS = [
		{
			name               : 'trucks',
			type               : 'fieldArray',
			span               : 12,
			buttonText         : 'Add More',
			noDeleteButtonTill : 1,
			value              : [
				{
					truck_type   : '',
					trucks_count : '',
				},
			],
			controls: [
				{
					name        : 'truck_type',
					label       : 'Truck Type',
					type        : 'select',
					placeholder : 'Select truck type',
					options     : [
						{
							label   : 'Open Body',
							options : geo?.options?.open_truck || [],
						},
						{
							label   : 'Closed Body',
							options : geo?.options?.closed_truck || [],
						},
					],
					rules: { required: true },

				},
				{
					name        : 'trucks_count',
					label       : 'Truck Count',
					placeholder : 'Enter count',
					type        : 'input',
					rules       : { required: true, validate: (val) => validate(val) },
				},
			],
		},
	];

	return TRUCKS_CONTROLS;
};
export default getTrucksControls;
