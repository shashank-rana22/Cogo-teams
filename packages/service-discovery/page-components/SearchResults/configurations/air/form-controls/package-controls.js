import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import validate from '../../../utils/validateNumber';

import TooltipLabel from './TooltipLabel';

const SELECTED_STYLE = {
	color          : '#1295a3',
	textDecoration : 'underline',
};

function WeightLabel({
	selectedWeightType = '',
	setSelectedWeightType = () => {},
	setValue = () => {},
}) {
	return (
		<div style={{ display: 'flex' }}>
			<span style={{ marginRight: '8px' }}>
				<span
					role="presentation"
					style={{ ...(selectedWeightType === 'weight_by_unit' ? SELECTED_STYLE : {}), cursor: 'pointer' }}
					onClick={() => {
						setSelectedWeightType('weight_by_unit');
						setValue('weight_unit', 'kg_unit');
					}}
				>
					Unit
				</span>
				{' / '}
				<span
					role="presentation"
					style={{ ...(selectedWeightType === 'weight_by_total' ? SELECTED_STYLE : {}), cursor: 'pointer' }}
					onClick={() => {
						setSelectedWeightType('weight_by_total');
						setValue('weight_unit', 'kg_total');
					}}
				>
					Total
				</span>
			</span>

			<Tooltip
				content="For rate calculation, weight will be converted to KG"
				placement="top"
			>
				<IcMInfo height={12} width={12} />
			</Tooltip>
		</div>
	);
}

const WEIGHT_OPTIONS = {
	weight_by_total: [
		{ label: 'KG/TOTAL', value: 'kg_total' },
		{ label: 'LB/TOTAL', value: 'lb_total' },
	],
	weight_by_unit: [
		{ label: 'KG/UNIT', value: 'kg_unit' },
		{ label: 'LB/UNIT', value: 'lb_unit' },
	],
};

const DIMENSIONS_OPTIONS = [
	{ label: 'CM', value: 'cm' },
	{ label: 'IN', value: 'inch' },
];

const STACKABILITY_OPTIONS = [
	{ label: 'Stackable', value: 'stackable' },
	{ label: 'Non-stackable', value: 'non_stackable' },
];

export const getPackageControls = ({
	selectedWeightType = '',
	setSelectedWeightType = () => {},
	setValue = () => {},
}) => {
	const PACKAGE_CONTROLS = [
		{
			name               : 'packages',
			type               : 'field-array',
			buttonText         : 'Add another Package Type',
			noDeleteButtonTill : 1,
			controls           : [
				{
					name           : 'packages_count',
					label          : 'No. of Units',
					type           : 'input',
					optionsListKey : 'container-sizes',
					span           : 4,
					value          : 1,
					rules          : {
						required : 'Count is required',
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name           : 'packing_type',
					label          : 'Unit Type',
					type           : 'select',
					optionsListKey : 'package-types',
					span           : 8,
					value          : 'box',
					rules          : { required: 'Package type is required' },
				},
				{
					name        : 'length',
					label       : 'Length',
					type        : 'input',
					placeholder : 'Enter length',
					span        : 3,
					value       : 1,
					rules       : {
						required : true,
						validate : (val) => validate(val),
						max      : 10000,
						min      : 0.1,
					},
				},
				{
					name        : 'width',
					label       : 'Width',
					type        : 'input',
					placeholder : 'Enter width',
					span        : 3,
					value       : 1,
					rules       : {
						required : true,
						validate : (val) => validate(val),
						max      : 10000,
						min      : 0.1,
					},
				},
				{
					name        : 'height',
					label       : 'Height',
					type        : 'input',
					placeholder : 'Enter height',
					span        : 3,
					value       : 1,
					rules       : {
						required : true,
						validate : (val) => validate(val),
						max      : 10000,
						min      : 0.1,
					},
				},
				{
					name  : 'dimensions_unit',
					label : <TooltipLabel
						labelText="Unit"
						tooltipText="For rate calculation, volume will be converted to CBM"
					/>,
					type    : 'select',
					span    : 3,
					value   : 'cm',
					options : DIMENSIONS_OPTIONS,
					rules   : { required: 'This is required' },
				},
				{
					name        : 'package_weight',
					label       : 'Weight',
					type        : 'input',
					placeholder : 'Enter weight',
					span        : 4,
					value       : 1,
					rules       : {
						required : 'Weight is required',
						validate : (val) => validate(val),
						max      : 10000,
						min      : 1,
					},
				},
				{
					name  : 'weight_unit',
					label : <WeightLabel
						selectedWeightType={selectedWeightType}
						setSelectedWeightType={setSelectedWeightType}
						setValue={setValue}
					/>,
					type    : 'select',
					span    : 8,
					value   : 'kg_unit',
					options : WEIGHT_OPTIONS[selectedWeightType],
					rules   : { required: 'This is required' },
				},
				{
					name    : 'handling_type',
					type    : 'chips',
					span    : 10,
					value   : 'stackable',
					options : STACKABILITY_OPTIONS,
				},
			],
		},
	];

	return PACKAGE_CONTROLS;
};
