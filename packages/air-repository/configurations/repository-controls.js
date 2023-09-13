import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import validateMobileNumber from '../utils/validateMobileNumber';

const repositoryControls = (t = () => {}) => ({
	basic: [
		{
			name        : 'airline_id',
			type        : 'async-select',
			asyncKey    : 'list_operators',
			label       : t('airRepository:airline_label'),
			placeholder : t('airRepository:airline_placeholder'),
			params      : {
				filters    : { operator_type: 'airline', status: 'active' },
				page_limit : 10,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
			initialCall : true,
			span        : 6,
			rules       : {
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
			initialCall : true,
			label       : t('airRepository:airport_label'),
			placeholder : t('airRepository:airport_placeholder'),
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'booking_mode',
			type        : 'select',
			label       : t('airRepository:booking_mode_label'),
			placeholder : t('airRepository:booking_mode_placeholder'),
			options     : [
				{ value: 'email', label: t('airRepository:e-mail_label') },
				{ value: 'platform', label: t('airRepository:platform_label') },
				{ value: 'email_and_platform', label: t('airRepository:e-mail_or_platform_label') },
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
					label : t('airRepository:available_label'),
					value : 'available',
				},
				{
					label : t('airRepository:not_available_label'),
					value : 'not_available',
				},
			],
			value : 'not_available',
			label : t('airRepository:e_booking_availability_label'),
			span  : 6,
			rules : {
				required: true,
			},
		},
		{
			name        : 'inventory_stock_availability',
			type        : 'select',
			placeholder : t('airRepository:inventory_stock_availability_placeholder'),
			options     : [
				{
					label : t('airRepository:before_booking_label'),
					value : 'before_booking',
				},
				{
					label : t('airRepository:after_booking_label'),
					value : 'after_booking',
				},
			],
			label : t('airRepository:inventory_stock_availability_label'),
			span  : 6,
			rules : {
				required: true,
			},
		},
		{
			name        : 'ams_mode',
			type        : 'select',
			placeholder : t('airRepository:ams_mode_placeholder'),
			options     : [
				{
					label : t('airRepository:electronic_label'),
					value : 'electronic',
				},
				{
					label : t('airRepository:manual_label'),
					value : 'manual',
				},
			],
			label : t('airRepository:ams_mode_label'),
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
			buttonText         : t('airRepository:pocs_data_button'),
			controls           : [
				{
					name        : 'name',
					type        : 'text',
					label       : t('airRepository:poc_name_label'),
					placeholder : t('airRepository:poc_name_placeholder'),
					span        : 6,
					rules       : {
						required: true,
					},
				},
				{
					name        : 'email',
					type        : 'text',
					label       : t('airRepository:poc_email_label'),
					placeholder : t('airRepository:poc_email_placeholder'),
					span        : 6,
					rules       : {
						required : true,
						pattern  : {
							value   : GLOBAL_CONSTANTS.regex_patterns.email,
							message : t('airRepository:poc_email_regex_message'),
						},
					},
				},
				{
					name        : 'mobile',
					type        : 'mobile',
					inputType   : 'number',
					label       : t('airRepository:poc_mobile_label'),
					placeholder : t('airRepository:poc_mobile_placeholder'),
					span        : 8,
					rules       : {
						validate: (val) => validateMobileNumber(val, t),
					},
				},
			],
		},
		{
			name    : 'rate_required',
			type    : 'select',
			options : [
				{
					label : t('airRepository:yes_label'),
					value : 'yes',
				},
				{
					label : t('airRepository:no_label'),
					value : 'no',
				},
			],
			value : 'yes',
			label : t('airRepository:rate_required_label'),
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
			label       : t('airRepository:lms_url_label'),
			placeholder : t('airRepository:lms_url_placeholder'),
			span        : 6,
			rules       : {
				required : true,
				pattern  : {
					value   : GLOBAL_CONSTANTS.regex_patterns.url_match,
					message : t('airRepository:lms_url_regex_message'),
				},
			},
		},
		{
			name        : 'lms_user_id',
			type        : 'text',
			label       : t('airRepository:lms_user_id_label'),
			placeholder : t('airRepository:lms_user_id_placeholder'),
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'lms_password',
			type        : 'text',
			label       : t('airRepository:lms_password_label'),
			placeholder : t('airRepository:lms_password_placeholder'),
			span        : 6,
			rules       : {
				required: true,
			},
		},
	],
});

export default repositoryControls;
