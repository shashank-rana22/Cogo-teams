import FEE_UNIT_MAPPING from '../FEE_UNIT_MAPPING.json';
import SLAB_UNIT_MAPPING from '../SLAB_UNIT_MAPPING.json';

const MAX_MIN_FEE_VAL = 1;
const MIN_NUMBER = 0;

const EMPTY_FIELD_ARRAY = [
	{
		slab_unit: '',
	},
];

const getMandatoryControls = ({ activeService }) => [
	{
		name               : 'control_name',
		type               : 'fieldArray',
		showButtons        : true,
		noDeleteButtonTill : 1,
		buttonText         : 'Add',
		rules              : { required: true },
		showHeading        : false,
		value              : EMPTY_FIELD_ARRAY,
		controls           : [
			{
				name        : 'slab_unit',
				label       : 'Fees Slab Unit',
				type        : 'select',
				placeholder : 'Select Type',
				options     : SLAB_UNIT_MAPPING[activeService],
				rules       : {
					required: 'Slab Unit is Required.',
				},
				span     : 1.5,
				disabled : false,
				size     : 'sm',
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
				options     : FEE_UNIT_MAPPING[activeService],
				rules       : { required: 'Fees Type is Required.' },
				span        : 1.5,
				size        : 'sm',
			},
			{
				name           : 'fee_currency',
				label          : 'Fees Currency',
				type           : 'select',
				placeholder    : 'Value',
				optionsListKey : 'currencies',
				rules          : {
					required: 'Fee Currency is Required.',
				},
				span : 1.5,
				size : 'sm',
			},
			{
				name        : 'fee_value',
				label       : 'Convenience Fees',
				type        : 'number',
				placeholder : 'Value',
				rules       : {
					required : 'Convenience Fees is Required.',
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

export default getMandatoryControls;
