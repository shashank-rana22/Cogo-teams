const repositoryControls = () => ({
	basic: [
		{
			name        : 'airline_id',
			type        : 'async-select',
			asyncKey    : 'list_operators',
			label       : 'Select Airline',
			placeholder : 'Select Airline...',
			params      : {
				filters    : { operator_type: 'airline', status: 'active' },
				page_limit : 10,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
			span  : 6,
			rules : {
				required: true,
			},
		},
		{
			name     : 'airport_id',
			type     : 'async-select',
			asyncKey : 'list_locations',
			params   : {
				filters: {
					type: 'airport',
				},
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { default_params_required: true },
			},
			label       : 'Select Airport',
			placeholder : 'Select Airport...',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'booking_mode',
			type        : 'select',
			label       : 'Select Mode',
			placeholder : 'Choose Email/Platform',
			options     : [
				{ value: 'email', label: 'E-mail' },
				{ value: 'platform', label: 'Platform' },
				{ value: 'email_and_platform', label: 'E-mail/Platform' },
			],
			span  : 6,
			rules : {
				required: true,
			},
		},
		{
			name    : 'e_booking_availability',
			type    : 'select',
			options : [
				{
					label : 'Available',
					value : 'available',
				},
				{
					label : 'Not Available',
					value : 'not_available',
				},
			],
			value : 'not_available',
			label : 'Is E Booking Available',
			span  : 6,
			rules : {
				required: true,
			},
		},
		{
			name        : 'inventory_stock_availability',
			type        : 'select',
			placeholder : 'Select...',
			options     : [
				{
					label : 'Before Booking',
					value : 'before_booking',
				},
				{
					label : 'After Booking',
					value : 'after_booking',
				},
			],
			label : 'When is Airway Bill Procured?',
			span  : 6,
			rules : {
				required: true,
			},
		},
	],
	email: [
		{
			name               : 'pocs_data',
			type               : 'fieldArray',
			span               : 12,
			showButtons        : true,
			noDeleteButtonTill : 1,
			buttonText         : 'Add POC Details',
			controls           : [
				{
					name        : 'name',
					type        : 'text',
					label       : 'Airline Person(POC)',
					placeholder : 'Enter name',
					span        : 6,
					rules       : {
						required: true,
					},
				},
				{
					name        : 'email',
					type        : 'text',
					label       : 'Airline E-mail ID',
					placeholder : 'Enter email',
					span        : 6,
					rules       : {
						required: true,
					},
				},
				{
					name        : 'mobile',
					type        : 'mobile',
					label       : 'Contact Number',
					placeholder : 'Enter contact number',
					span        : 6,
					rules       : {
						required: true,
					},
				},
			],
		},
		{
			name    : 'rate_required',
			type    : 'select',
			options : [
				{
					label : 'Yes',
					value : 'yes',
				},
				{
					label : 'No',
					value : 'no',
				},
			],
			value : 'yes',
			label : 'Do we send Agreed Rate in Email for this Airline?',
			span  : 6,
			rules : {
				required: true,
			},
		},

	],
	platform: [
		{
			name        : 'lms_url',
			type        : 'text',
			label       : 'Enter Platform URL',
			placeholder : 'Enter URL',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'lms_user_id',
			type        : 'text',
			label       : 'Enter Platform User Id',
			placeholder : 'Enter used id',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'lms_password',
			type        : 'text',
			label       : 'Enter Platform Password',
			placeholder : 'Enter password',
			span        : 6,
			rules       : {
				required: true,
			},
		},
	],
});

export default repositoryControls;
