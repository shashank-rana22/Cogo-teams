import containerSize from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

import FREE_DAYS_TYPES from '../../../../../configs/FREE_DAYS_TYPE.json';
import LOCATION_TYPES from '../../../../../configs/LOCATION_TYPE.json';
import SPECIFICITY_TYPES from '../../../../../configs/SPECIFICITY_TYPE.json';
import TRADE_TYPES from '../../../../../configs/TRADE_TYPE.json';

const fieldArrayField = [
	{
		label       : 'Lower Limit',
		name        : 'lower_limit',
		type        : 'number',
		span        : 3,
		placeholder : 'Lower Limit (in Days)',
		size        : 'sm',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'upper_limit',
		type        : 'number',
		span        : 3,
		size        : 'sm',
		label       : 'Upper Limit',
		placeholder : 'Upper Limit (in Days)',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'currency',
		type        : 'async_select',
		asyncKey    : 'list_exchange_rate_currencies',
		span        : 3,
		label       : 'Currency',
		size        : 'sm',
		placeholder : 'Currency',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'price',
		type        : 'number',
		span        : 3,
		size        : 'sm',
		label       : 'Price',
		placeholder : 'Price',
		rules       : { required: 'This is required' },
	},
];

const getControls = ({ item = {} }) => [
	{
		label : 'Location Details',
		span  : 12,
		name  : 'location_details',
	},
	{
		name        : 'location_type',
		value       : item?.location?.type,
		disabled    : !!item?.location?.type,
		type        : 'select',
		placeholder : 'Location Type ',
		size        : 'sm',
		rules       : { required: true },
		span        : 3,
		options     : LOCATION_TYPES.fcl,
	},
	{
		name        : 'location_id',
		size        : 'sm',
		span        : 3,
		value       : item?.location_id,
		asyncKey    : 'list_locations',
		type        : 'async_select',
		disabled    : !!item?.location_id,
		isClearable : true,
		placeholder : 'Origin Location',
		rules       : { required: 'This is required' },
		params      : {
			filters: {
				status: 'active',
			},
			page_limit      : 20,
			includes        : { city: true, country: true, default_params_required: true },
			recommendations : true,
		},
	},
	{
		name        : 'shipping_line_id',
		size        : 'sm',
		type        : 'async_select',
		span        : 3,
		value       : item?.shipping_line_id,
		disabled    : !!item?.shipping_line_id,
		asyncKey    : 'list_operators',
		placeholder : 'Shipping Line',
		params      : {
			page_limit : 10,
			sort_by    : 'short_name',
			sort_type  : 'asc',
			filters    : { operator_type: 'shipping_line', status: 'active' },
		},
	},
	{
		name        : 'trade_type',
		size        : 'sm',
		type        : 'select',
		span        : 2.5,
		className   : 'primary lg',
		value       : item?.trade_type || undefined,
		disabled    : !!item?.trade_type,
		options     : TRADE_TYPES.fcl,
		placeholder : 'Trade Type',
	},
	{
		label : 'Service Provider Details',
		span  : 12,
		name  : 'service_details',
	},
	{
		name        : 'service_provider_id',
		placeholder : 'Service Provider',
		type        : 'async_select',
		size        : 'sm',
		value       : item?.service_provider_id || undefined,
		disabled    : !!item?.service_provider_id,
		asyncKey    : 'organizations',
		span        : 4,
		rules       : { required: 'This is required' },
		params      : {
			filters: {
				account_type : 'service_provider',
				status       : 'active',
				kyc_status   : 'verified',
			},
		},
		isClearable: true,
	},
	{
		name        : 'sourced_by_id',
		placeholder : 'Rate Provided by user',
		type        : 'async_select',
		asyncKey    : 'organization_users',
		size        : 'sm',
		isClearable : true,
		span        : 4,
		valueKey    : 'user_id',
		rules       : { required: 'This is required' },
	},
	{
		label : 'Container Details',
		name  : 'container_details',
		span  : 12,
	},
	{
		name        : 'container_size',
		type        : 'select',
		size        : 'sm',
		span        : 4,
		value       : item?.container_size || undefined,
		disabled    : !!item.container_size,
		placeholder : 'Container Size',
		options     : containerSize,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'container_type',
		type        : 'select',
		size        : 'sm',
		span        : 4,
		value       : item?.container_type || undefined,
		disabled    : !!item?.container_type,
		placeholder : 'Container Type',
		rules       : { required: 'This is required' },
		options     : containerTypes,
	},
	{
		label : 'Free Limit Details',
		span  : 12,
		name  : 'other_details',
	},
	{
		name        : 'free_limit',
		type        : 'number',
		size        : 'sm',
		span        : 4,
		value       : item?.free_limit || undefined,
		placeholder : 'Free Limit Days',
	},
	{
		name        : 'specificity_type',
		type        : 'select',
		span        : 4,
		value       : item?.specificity_type || undefined,
		disabled    : !!item?.specificity_type,
		size        : 'sm',
		placeholder : 'Specificity Type',
		options     : SPECIFICITY_TYPES.fcl,
	},

	{
		label : 'Validity Start and End Date',
		span  : 12,
		name  : 'validity_details',
	},
	{
		name  : 'validity',
		type  : 'date_range_picker',
		value :	item?.validity_start && item?.validity_end
			? { startDate: new Date(item?.validity_start), endDate: new Date(item?.validity_end) } : {},
		span        : 8,
		placeholder : 'Select Validity Range',
		rules       : { required: 'This is required' },
	},
	{
		label : 'Previous Days Applicable',
		name  : 'previous_days_applicable_label',
		span  : 12,
	},
	{
		name    : 'previous_days_applicable',
		type    : 'chips',
		span    : 4,
		value   : item?.previous_days_applicable ? 'yes' : 'no',
		options : [
			{
				children : 'Yes',
				key      : 'yes',
			},
			{
				children : 'No',
				key      : 'no',
			},
		],
	},

	{
		label : 'Free Days Type',
		name  : 'free_days_type_label',
		span  : 12,
	},
	{
		name        : 'free_days_type',
		type        : 'select',
		span        : 4,
		value       : item?.free_days_type || undefined,
		disabled    : !!item.free_days_type,
		size        : 'sm',
		options     : FREE_DAYS_TYPES,
		placeholder : 'Free Days Type',
		rules       : { required: 'This is required' },
	},
	{
		label : 'Demurrage',
		name  : 'demurrage_label',
		span  : 12,
	},
	{
		type               : 'fieldArray',
		showButtons        : true,
		name               : 'demurrage',
		buttonText         : 'Add Slab',
		noDeleteButtonTill : 0,
		value:
      item?.free_days_type === 'demurrage' ? item?.slabs : [{ lower_limit: '' }],
		controls: fieldArrayField,
	},
	{
		label : 'Detention',
		name  : 'detention_label',
		span  : 12,
	},
	{
		name               : 'detention',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Slab',
		noDeleteButtonTill : 0,
		value:
      item?.free_days_type === 'detention' ? item?.slabs : [{ lower_limit: '' }],
		controls: fieldArrayField,
	},
];

export default getControls;
