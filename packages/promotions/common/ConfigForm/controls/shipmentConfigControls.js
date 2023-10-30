import DISCOUNT_LIMIT_UNIT_MAPPING from '../../../configs/DISCOUNT_LIMIT_UNIT_MAPPING.json';
import SLAB_UNIT_MAPPING from '../../../configs/SLAB_UNIT_MAPPING.json';
import handleFieldArrayAddCheck from '../../../helpers/checkShipmentSlabConfig';

const MIN_DISCOUNT_PRICE = 0;

const getShipmentConfigControls = [{
	name               : 'shipment_price_slab_config',
	type               : 'fieldArray',
	showButtons        : true,
	buttonText         : 'Add',
	noDeleteButtonTill : 1,
	handleFieldArrayAddCheck,
	controls           : [
		{
			name     : 'slab_unit',
			label    : 'Slab Unit',
			type     : 'select',
			options  : SLAB_UNIT_MAPPING,
			span     : 1.7,
			disabled : true,
			size     : 'sm',
		},
		{
			name        : 'slab_unit_currency',
			label       : 'Slab Currency',
			type        : 'async_select',
			asyncKey    : 'list_exchange_rate_currencies',
			initialCall : true,
			placeholder : 'Currency',
			rules       : {
				required: 'Slab Currency is required',
			},
			span : 1.2,
			size : 'sm',
		},
		{
			name        : 'slab_lower_limit',
			label       : 'Slab From',
			type        : 'number',
			placeholder : 'Value',
			span        : 1.2,
			rules       : {
				min      : 1,
				required : 'Slab From is Required.',
			},
			disabled : true,
			size     : 'sm',
		},
		{
			name        : 'slab_upper_limit',
			label       : 'Slab To',
			type        : 'number',
			placeholder : 'Value',
			span        : 1.2,
			rules       : {
				min      : 1,
				required : 'Slab To is Required.',
			},
			size: 'sm',
		},
		{
			name        : 'discount_limit_unit',
			label       : 'Discount Limit Unit',
			type        : 'select',
			placeholder : 'Value',
			options     : DISCOUNT_LIMIT_UNIT_MAPPING,
			value       : 'percentage',
			rules       : { required: 'Discount Limit Unit is required' },
			span        : 1.4,
			size        : 'sm',
		},
		{
			name        : 'discount_limit_value',
			label       : 'Discount Limit Value',
			type        : 'number',
			placeholder : 'Value',
			rules       : {
				required : 'Discount Limit Value is required',
				min      : 0,
				validate : (value) => (value >= MIN_DISCOUNT_PRICE ? true : 'Invalid Price Value'),
			},
			span : 1.5,
			size : 'sm',
		},
		{
			name        : 'max_allowed_discount_value',
			label       : 'Max Allowed Discount Value',
			type        : 'number',
			placeholder : 'Value',
			rules       : {
				required : 'Max Allowed Discount Value is required',
				min      : 0,
				validate : (value) => (value >= MIN_DISCOUNT_PRICE ? true : 'Invalid Price Value'),
			},
			span : 2,
			size : 'sm',
		},
	],
}];

export default getShipmentConfigControls;
