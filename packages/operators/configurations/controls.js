import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCloudUpload } from '@cogoport/icons-react';

const fields = (t = () => {}) => [
	{
		name        : 'short_name',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_short_name'),
		label       : t('operators:controls_label_short_name'),
		rules       : {
			required: t('operators:controls_rule_short_name'),
		},
	},
	{
		name        : 'business_name',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_business_name'),
		label       : t('operators:controls_label_business_name'),
		rules       : {
			required: t('operators:controls_rule_business_name'),
		},
	},
	{
		name        : 'operator_type',
		type        : 'select',
		span        : 6,
		placeholder : t('operators:controls_placeholer_operator_type'),
		label       : t('operators:controls_label_operator_type'),
		options     : [
			{ label: t('operators:controls_sub_option_airline'), value: 'airline' },
			{ label: t('operators:controls_sub_option_shipping_line'), value: 'shipping_line' },
			{ label: t('operators:controls_sub_option_barge'), value: 'barge' },
			{ label: t('operators:controls_sub_option_rail'), value: 'rail' },
		],
		disabled :	false,
		rules    : {
			required: t('operators:controls_rule_operator_type'),
		},
	},
	{
		name        : 'iata_code',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_iata_code'),
		label       : t('operators:controls_label_iata_code'),
		rules       : {
			required: t('operators:controls_rule_iata_code'),
		},
	},
	{
		name        : 'icao_code',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_icao_code'),
		label       : t('operators:controls_label_icao_code'),
	},
	{
		name        : 'airway_bill_prefix',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_awb_prefix'),
		label       : t('operators:controls_label_awb_prefix'),
		rules       : {
			required: t('operators:controls_rule_awb_prefix'),
		},
	},
	{
		name        : 'masked_name',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_masked_name'),
		label       : t('operators:controls_label_masked_name'),
	},
	{
		name        : 'web_url',
		type        : 'text',
		span        : 12,
		placeholder : t('operators:controls_placeholer_web_url'),
		label       : t('operators:controls_label_web_url'),
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.url_match,
				message : t('operators:controls_rule_url'),
			},
		},
	},
	{
		name        : 'status',
		type        : 'select',
		span        : 6,
		placeholder : t('operators:controls_placeholer_status'),
		label       : t('operators:controls_label_status'),
		options     : [
			{ label: t('operators:controls_sub_option_active'), value: 'active' },
			{ label: t('operators:controls_sub_option_inactive'), value: 'inactive' },
		],
	},
	{
		name        : 'is_nvocc',
		type        : 'select',
		span        : 6,
		placeholder : t('operators:controls_placeholer_select'),
		label       : t('operators:controls_label_is_nvocc'),
		options     : [
			{ label: t('operators:controls_sub_option_yes'), value: 'true' },
			{ label: t('operators:controls_sub_option_no'), value: 'false' },
		],
	},
	{
		name       : 'logo_url',
		label      : t('operators:controls_label_logo_url'),
		type       : 'file',
		drag       : true,
		span       : 12,
		maxSize    : '10485760',
		uploadType : 'aws',
		uploadIcon : <IcMCloudUpload />,
		accept     : '.png,.jpg,.jpeg',
	},
];

export default fields;
