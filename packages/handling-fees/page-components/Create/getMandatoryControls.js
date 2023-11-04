import { isEmpty } from '@cogoport/utils';

import FEE_UNIT_MAPPING from '../../configs/FEE_UNIT_MAPPING.json';
import SLAB_UNIT_MAPPING from '../../configs/SLAB_UNIT_MAPPING.json';
import handleFieldArrayAddCheck from '../../helpers/checkFeeConfiguration';
import getCurrencyOptions from '../../helpers/getCurrencyOptions';

import getFilteredSlabDetails from './getFilteredSlabDetails';

const MAX_MIN_FEE_VAL = 1;
const MIN_NUMBER = 0;

const EMPTY_FIELD_ARRAY = [
	{
		slab_unit    : '',
		fee_unit     : '',
		fee_value    : '',
		fee_currency : '',
	},
];

const getMandatoryControls = ({
	activeService = '', service, data = {}, control_name = '', isAddFieldArrayCheck = false,
}) => {
	const { slab_details = [] } = control_name === 'slab_details'
		? data?.data || {} : data || {};

	const newSlabDetails = getFilteredSlabDetails({
		slab_details,
		control_name,
	});

	return [
		{
			name               : control_name,
			type               : 'fieldArray',
			showButtons        : true,
			noDeleteButtonTill : 1,
			buttonText         : 'Add',
			rules              : { required: true },
			showHeading        : false,
			initialCall        : true,
			value              : !isEmpty(newSlabDetails) ? newSlabDetails : EMPTY_FIELD_ARRAY,
			...(isAddFieldArrayCheck ? { handleFieldArrayAddCheck } : {}),
			controls           : [
				{
					name        : 'slab_unit',
					label       : 'Fees Slab Unit',
					type        : 'select',
					placeholder : 'Select Type',
					options     : SLAB_UNIT_MAPPING[activeService || service],
					rules       : { required: 'Slab Unit is Required.' },
					span        : 1.5,
					disabled    : false,
					size        : 'sm',
				},
				{
					name        : 'slab_lower_limit',
					label       : 'Slab From',
					type        : 'number',
					placeholder : 'Value',
					span        : 1,
					rules       : {
						min      : 0,
						required : 'Slab From is Required.',
					},
					disabled : false,
					size     : 'sm',
				},
				{
					name        : 'slab_upper_limit',
					label       : 'Slab To',
					type        : 'number',
					placeholder : 'Value',
					span        : 1,
					rules       : {
						min      : 0,
						required : 'Slab To is Required.',
					},
					size: 'sm',
				},
				{
					name        : 'fee_unit',
					label       : 'Fee Unit',
					type        : 'select',
					placeholder : 'Select Type',
					options     : FEE_UNIT_MAPPING[activeService || service],
					rules       : { required: 'Fees Type is Required.' },
					span        : 1.5,
					size        : 'sm',
				},
				{
					name        : 'fee_currency',
					label       : 'Fees Currency',
					type        : 'select',
					options     : getCurrencyOptions(),
					placeholder : 'Value',
					rules       : {
						required: 'Fee Currency is Required.',
					},
					span : 1.5,
					size : 'sm',
				},
				{
					name        : 'fee_value',
					label       : 'Handling Fee',
					type        : 'number',
					placeholder : 'Value',
					rules       : {
						required : 'Handling Fee is Required.',
						min      : 0,
						validate : (value) => (value >= MIN_NUMBER ? undefined : 'Invalid Price Value'),
					},
					span : 1.5,
					size : 'sm',
				},
				{
					name        : 'minimum_fee_value',
					label       : 'Minimum Value',
					type        : 'number',
					placeholder : 'Value',
					span        : 1.5,
					rules       : {
						min      : 0,
						validate : (value) => (value && value < MAX_MIN_FEE_VAL ? 'Invalid Price Value' : undefined),
					},
					size: 'sm',
				},
				{
					name        : 'maximum_fee_value',
					label       : 'Maximum Value',
					type        : 'number',
					placeholder : 'Value',
					span        : 1.5,
					rules       : {
						min: 0,
					},
					size: 'sm',
				},
			],
		},
	];
};

export default getMandatoryControls;