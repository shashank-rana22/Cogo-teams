import CONTAINER_SIZE from '@cogoport/constants/container-sizes.json';
import CONTAINER_TYPES from '@cogoport/constants/container-types.json';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import BOOKING_TYPE from '../../../configs/BOOKING_TYPE.json';
import CHARGE_TYPE from '../../../configs/CHARGE_TYPE.json';
import CONDITION_ATTRIBUTE from '../../../configs/CONDITION_ATTRIBUTE.json';
import CONDITION_CONDITION from '../../../configs/CONDITION_CONDITION.json';
import MILESTONE from '../../../configs/MILESTONE.json';
import ORGANIZATION_TYPE from '../../../configs/ORGANIZATION_TYPE.json';
import RATE_TYPE from '../../../configs/RATE_TYPE.json';
import SHIPMENT_TYPES from '../../../configs/SHIPMENT_TYPES.json';
import { CANCELREVERSEMAPPING } from '../../../utils/cancellationReasonMapper';

const currencyOptions = GLOBAL_CONSTANTS.service_supported_countries
	.feature_supported_service.feedback_services.currencies.map((c) => ({ label: c, value: c }));

const THIRTY_ONE = 31;
const ZERO = 0;
const ONE = 1;
const getDaysOptions = Array(THIRTY_ONE).fill(ZERO)
	.map((_, idx) => ({ label: idx + ONE, value: idx + ONE }));

const getControls = ({ item, isEdit }) => {
	const CONDITIONS_VALUE = (item?.conditions || []).map((condition) => ({
		attribute : Object.keys(condition || {})[GLOBAL_CONSTANTS.zeroth_index],
		condition : CANCELREVERSEMAPPING[Object.values(condition || {})[GLOBAL_CONSTANTS.zeroth_index]
			.split(' ')[GLOBAL_CONSTANTS.zeroth_index]],
		days: +Object.values(condition || {})[GLOBAL_CONSTANTS.zeroth_index].split(' ')[ONE],
	}));
	return [{
		name        : 'service',
		type        : 'select',
		placeholder : 'Select Service',
		label       : 'Service',
		value       : item?.service,
		rules       : { required: 'Service is required' },
		options     : SHIPMENT_TYPES,
		disabled    : isEdit,
		span        : 4,
	}, {
		name           : 'airline_id',
		label          : 'Airline',
		type           : 'async_select',
		asyncKey       : 'list_operators',
		value          : item?.airline_id,
		optionsListKey : 'air-lines',
		placeholder    : 'Select Airline',
		isClearable    : !item?.airline_id,
		disabled       : isEdit,
	}, {
		name           : 'origin_location_id',
		type           : 'async_select',
		asyncKey       : 'list_locations',
		placeholder    : 'Enter Origin',
		label          : 'Origin',
		value          : item?.origin_location_id,
		isClearable    : !item?.origin_location_id,
		optionsListKey : 'locations',
		disabled       : isEdit,
		params         : { filters: { type: ['seaport', 'country', 'airport'] } },
		span           : 4,
	}, {
		name           : 'destination_location_id',
		type           : 'async_select',
		asyncKey       : 'list_locations',
		placeholder    : 'Enter Destination',
		label          : 'Destination',
		value          : item?.destination_location_id,
		isClearable    : !item?.destination_location_id,
		optionsListKey : 'locations',
		disabled       : isEdit,
		params         : {
			filters: {
				type: ['seaport', 'country', 'airport'],
			},
		},
		span: 4,
	}, {
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'async_select',
		asyncKey       : 'list_operators',
		value          : item?.shipping_line_id,
		placeholder    : 'Select Shipping Line',
		optionsListKey : 'shipping-lines',
		isClearable    : !isEdit,
		params         : {
			filters: { operator_type: 'shipping_line', status: 'active' },
		},
		disabled: isEdit,
	}, {
		name        : 'commodity',
		type        : 'select',
		placeholder : 'Select Commodity',
		label       : 'Commodity',
		value       : item?.commodity,
		disabled    : isEdit,
		options     : [],
	}, {
		name               : 'conditions',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Conditions',
		noDeleteButtonTill : 0,
		value              : isEdit ? CONDITIONS_VALUE : [],
		controls           : [
			{
				name    : 'attribute',
				label   : 'Attribute',
				type    : 'select',
				options : CONDITION_ATTRIBUTE,
				span    : 2,
			}, {
				name    : 'condition',
				label   : 'Condition',
				type    : 'select',
				options : CONDITION_CONDITION,
				rules   : { required: true },
				span    : 2,
			}, {
				name    : 'days',
				label   : 'Days',
				type    : 'select',
				options : getDaysOptions,
				rules   : { required: true },
				span    : 2,
			}],
	}, {
		name        : 'charge_type',
		type        : 'select',
		label       : 'Charge Type',
		disabled    : isEdit,
		value       : item?.charge_type,
		placeholder : 'Select Charge Type',
		rules       : { required: 'This is required' },
		options     : CHARGE_TYPE,
		span        : 2,
	}, {
		name        : 'value',
		type        : 'number',
		label       : 'Value',
		value       : item?.value,
		placeholder : 'Enter Value',
		span        : 4,
	},
	{
		name        : 'min_value',
		type        : 'number',
		label       : 'Min Value',
		value       : item?.min_value,
		placeholder : 'Minimum Value',
		span        : 2,
		rules       : { required: 'This is required', min: 0 },
	},
	{
		name        : 'max_value',
		type        : 'number',
		label       : 'Max Value',
		value       : item?.max_value,
		placeholder : 'Maximum Value',
		span        : 2,
		rules       : { required: 'This is required', min: 0 },
	},
	{
		name        : 'currency',
		type        : 'select',
		label       : 'Currency',
		value       : item?.currency,
		options     : currencyOptions,
		placeholder : 'Select currency',
		rules       : { required: 'Currency is required' },
		span        : 4,
	},
	{
		name        : 'container_size',
		label       : 'Container Size',
		type        : 'select',
		value       : item?.container_size,
		isClearable : !isEdit,
		placeholder : 'Eg. 20ft',
		disabled    : isEdit,
		options     : CONTAINER_SIZE,
	},
	{
		name        : 'container_type',
		label       : 'Container Type',
		isClearable : !item?.container_type,
		value       : item?.container_type,
		type        : 'select',

		options     : CONTAINER_TYPES,
		placeholder : 'Select',
		disabled    : isEdit,
	},
	{
		name        : 'booking_type',
		label       : 'Booking Type',
		type        : 'select',
		placeholder : 'Select Booking Type',
		value       : item?.booking_type,
		disabled    : isEdit,
		options     : BOOKING_TYPE,
		rules       : { required: 'Booking Type is required' },
		span        : 6,
	},
	{
		label       : 'Organization Type',
		name        : 'organization_type',
		type        : 'select',
		value       : item?.organization_type,
		isClearable : !item?.organization_type,
		placeholder : 'Select Organization Type',
		disabled    : isEdit,
		options     : ORGANIZATION_TYPE,
	},
	{
		label       : 'Select Rate Type',
		name        : 'rate_type',
		type        : 'select',
		placeholder : 'Select Rate Type',
		value       : item?.rate_type,
		disabled    : isEdit,
		options     : RATE_TYPE,
		rules       : { required: 'Rate Type is required' },
	},
	{
		label : 'Free Days',
		name  : 'free_days',
		type  : 'number',
	},
	{
		label   : 'Milestone',
		name    : 'milestone',
		type    : 'select',
		options : MILESTONE,
	}, {
		name               : 'slabs',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Slab',
		noDeleteButtonTill : 0,
		controls           : [{
			name        : 'lower_limit',
			type        : 'number',
			placeholder : 'Lower Limit (in Days)',
			span        : 3,
			rules       : { required: 'This is required', min: 1 },
		}, {
			name        : 'upper_limit',
			type        : 'number',
			span        : 3,
			placeholder : 'Upper Limit (in Days)',
			rules       : { required: 'This is required', min: 1 },
		}, {
			name           : 'currency',
			placeholder    : 'Currency',
			type           : 'select',
			optionsListKey : 'currencies',
			span           : 3,
			options        : currencyOptions,
			rules          : { required: 'This is required' },
		}, {
			name        : 'price',
			placeholder : 'Enter Price',
			type        : 'number',
			span        : 2,
			rules       : { required: 'This is required' },
		}],
	}];
};
export default getControls;
