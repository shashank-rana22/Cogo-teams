import containerSize from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';

const getControls = ({ item = {} }) => [
	{
		label : 'Location Details',
		span  : 12,
		name  : 'location_details',
	},
	{
		name        : 'location_type',
		value       : item?.location?.type,
		// disabled    : !!item?.id,
		type        : 'select',
		placeholder : 'Location Type ',
		size        : 'sm',
		rules       : {
			required: true,
		},
		span    : 3,
		options : [
			{
				label : 'Seaport',
				value : 'seaport',
			},
			{
				label : 'Country',
				value : 'country',
			},
			{
				label : 'Trade',
				value : 'trade',
			},
			{
				label : 'Continent',
				value : 'continent',
			},
		],
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
		placeholder : 'Origin Location',
		// rules       : { required: 'This is required' },
	},
	{
		name  : 'shipping_line_id',
		size  : 'sm',
		type  : 'async_select',
		span  : 3,
		value : item?.shipping_line_id,
		// disabled: !!task.id,

		asyncKey    : 'list_operators',
		placeholder : 'Shipping Line',
		params      : {
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
			filters    : { operator_type: 'shipping_line', status: 'active' },

		},
	},
	{
		name      : 'trade_type',
		size      : 'sm',
		type      : 'select',
		span      : 2.5,
		className : 'primary lg',
		value     : item?.trade_type || undefined,
		// disabled  : !!task.id,
		options   : [
			{
				label : 'Import',
				value : 'import',
			},
			{
				label : 'Export',
				value : 'export',
			},
		],
		placeholder: 'Trade Type',
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
		name        : 'container_size',
		type        : 'select',
		size        : 'sm',
		span        : 4,
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
		span        : 4,
		value       : item?.container_type || undefined,
		// disabled    : !!task.id,
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
		// disabled: !!task.id,
		size        : 'sm',
		placeholder : 'Specificity Type',
		options     : [
			{
				label : 'Cogoport',
				value : 'cogoport',
			},
			{
				label : 'Shipping Line',
				value : 'shipping_line',
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
