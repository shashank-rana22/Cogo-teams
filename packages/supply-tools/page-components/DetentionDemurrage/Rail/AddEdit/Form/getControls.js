import containerSize from '@cogoport/constants/rail-container-sizes.json';
import containerTypes from '@cogoport/constants/rail-container-types.json';

// eslint-disable-next-line max-lines-per-function
const getControls = ({ item = {} }) => [
	{
		label : 'Location Details Rail',
		span  : 12,
		name  : 'location_details',
	},
	{
		name        : 'location_id',
		size        : 'sm',
		span        : 3,
		value       : item?.location_id,
		asyncKey    : 'list_locations',
		type        : 'async_select',
		// disabled : !!item?.id,
		isClearable : true,
		placeholder : 'Locations',
		params      : {
			filters: {
				type: ['railway_terminal'],
			},
		},
		// rules       : { required: 'This is required' },
	},
	{
		label : 'Service Provider Details',
		span  : 12,
		name  : 'service_details',
		// showOptional : false,
	},
	{
		name        : 'service_provider_id',
		placeholder : 'Service Provider',
		type        : 'async_select',
		size        : 'sm',
		value       : item?.service_provider_id || undefined,
		// disabled       : !!task.id,
		asyncKey    : 'organizations',
		initialCall : true,
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
		name        : 'container_load_type',
		placeholder : 'Container Load Type',
		type        : 'select',
		size        : 'sm',
		value       : item?.container_load_type || undefined,
		// disabled       : !!item.id,
		options     : [
			{ label: 'Container Rake', value: 'container_rake' },
			{ label: 'Rake', value: 'rake' },
		],
		span: 3,
	},
	{
		name        : 'container_size',
		type        : 'select',
		size        : 'sm',
		span        : 3,
		value       : item?.container_size || undefined,
		// disabled       : !!task.id,
		placeholder : 'Container Size',
		options     : containerSize,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'container_type',
		type        : 'select',
		size        : 'sm',
		span        : 3,
		value       : item?.container_type || undefined,
		// disabled    : !!task.id,
		placeholder : 'Container Type',
		rules       : { required: 'This is required' },
		options     : containerTypes,
	},
	{
		name        : 'container_load_sub_type',
		type        : 'select',
		span        : 3,
		size        : 'sm',
		value       : item?.container_type || undefined,
		// disabled: !!item.id,
		placeholder : 'Container Load Sub Type',
		rules       : { required: 'This is required' },
		options     : [
			{ label: 'Piece Mile', value: 'piece_mile' },
			{ label: 'Full Rake', value: 'full_rake' },
		],
	},

	{
		label : 'Commodity Details',
		name  : 'commodity_details',
		span  : 12,
	},
	{
		name        : 'commodity',
		placeholder : 'Commodity',
		type        : 'select',
		span        : 4,
		size        : 'sm',
		value       : item?.commodity || undefined,
		// disabled    : !!item.id,
		options     : [
			{ label: 'General', value: 'general' },
			{ label: 'Dangerous', value: 'dangerous' },
			{ label: 'Temprature Controlled', value: 'temp_controlled' },
		],
	},
	{
		name        : 'commodity_sub_type',
		placeholder : 'Commodity Sub Type',
		type        : 'select',
		size        : 'sm',
		value       : item?.commodity_sub_type || undefined,
		// disabled: !!item.id,
		span        : 4,
		// opitons based on commodity
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
		// disabled: !!task.id,
		size        : 'sm',
		placeholder : 'Specificity Type',
		options     : [
			{
				label : 'Cogoport',
				value : 'cogoport',
			},
			{
				label : 'Rate Specific',
				value : 'rate_specific',
			},
		],
	},

	{
		label : 'Validity Start and End Date',
		span  : 12,
		name  : 'validity_details',
	},
	// check for css
	{
		name        : 'validity',
		type        : 'date_range_picker',
		// value       : { startDate: task?.validity_start, endDate: task?.validity_end },
		span        : 8,
		placeholder : 'Select Validity Range',
		rules       : { required: 'This is required' },
	},

	{
		label : 'Previous Days Applicable',
		name  : 'previous_days_applicable_label',
		span  : 12,
	},
	// REMAINING

	{
		label : 'Container Limit',
		name  : 'container_limit',
		span  : 12,
	},
	{
		name              : 'containers_count_lower_limit',
		type              : 'number',
		label             : 'Lower Limit',
		size              : 'sm',
		span              : 4,
		removeLabelMargin : true,
		value             : item?.containers_count_lower_limit || undefined,
		// disabled       : !!item.id,
		placeholder       : 'Containers Count Lower Limit',
		rules             : { required: 'This is required' },
	},
	{
		name              : 'containers_count_upper_limit',
		type              : 'number',
		label             : 'Upper Limit',
		size              : 'sm',
		span              : 4,
		removeLabelMargin : true,
		value             : item?.containers_count_upper_limit || undefined,
		// disabled       : !!item.id,
		placeholder       : 'Containers Count Upper Limit',
		rules             : { required: 'This is required' },
	},

	{
		label : 'Free Days Type',
		name  : 'free_days_type_label',
		span  : 12,
	},
	{
		name      : 'free_days_type',
		type      : 'select',
		span      : 4,
		value     : item?.free_days_type || undefined,
		// disabled  : !!task.id,
		className : 'primary lg',
		size      : 'sm',
		options   : [
			{
				label : 'Detention',
				value : 'detention',
			},
			{
				label : 'Demurrage',
				value : 'demurrage',
			},
		],

		placeholder : 'Free Days Type',
		rules       : { required: 'This is required' },
	},

	{
		label : 'Demurrage',
		name  : 'demurrage_label',
		span  : 12,
	},

];

export default getControls;
