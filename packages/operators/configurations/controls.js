import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCloudUpload } from '@cogoport/icons-react';

const fields = (t) => [
	{
		name        : 'short_name',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_1'),
		label       : t('operators:controls_label_1'),
		rules       : {
			required: t('operators:controls_rule_1'),
		},
	},
	{
		name        : 'business_name',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_2'),
		label       : t('operators:controls_label_2'),
		rules       : {
			required: t('operators:controls_rule_2'),
		},
	},
	{
		name        : 'operator_type',
		type        : 'select',
		span        : 6,
		placeholder : t('operators:controls_placeholer_3'),
		label       : t('operators:controls_label_3'),
		options     : [
			{ label: t('operators:controls_sub_option_1'), value: 'airline' },
			{ label: t('operators:controls_sub_option_2'), value: 'shipping_line' },
			{ label: t('operators:controls_sub_option_3'), value: 'barge' },
			{ label: t('operators:controls_sub_option_4'), value: 'rail' },
		],
		disabled :	false,
		rules    : {
			required: t('operators:controls_rule_3'),
		},
	},
	{
		name        : 'iata_code',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_4'),
		label       : t('operators:controls_label_4'),
		rules       : {
			required: t('operators:controls_rule_4'),
		},
	},
	{
		name        : 'icao_code',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_5'),
		label       : t('operators:controls_label_5'),
	},
	{
		name        : 'airway_bill_prefix',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_6'),
		label       : t('operators:controls_label_6'),
		rules       : {
			required: t('operators:controls_rule_5'),
		},
	},
	{
		name        : 'masked_name',
		type        : 'text',
		span        : 6,
		placeholder : t('operators:controls_placeholer_7'),
		label       : t('operators:controls_label_7'),
	},
	{
		name        : 'web_url',
		type        : 'text',
		span        : 12,
		placeholder : t('operators:controls_placeholer_8'),
		label       : t('operators:controls_label_8'),
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.url_match,
				message : t('operators:controls_rule_6'),
			},
		},
	},
	{
		name        : 'status',
		type        : 'select',
		span        : 6,
		placeholder : t('operators:controls_placeholer_9'),
		label       : t('operators:controls_label_9'),
		options     : [
			{ label: t('operators:controls_sub_option_5'), value: 'active' },
			{ label: t('operators:controls_sub_option_6'), value: 'inactive' },
		],
	},
	{
		name        : 'is_nvocc',
		type        : 'select',
		span        : 6,
		placeholder : t('operators:controls_placeholer_10'),
		label       : t('operators:controls_label_10'),
		options     : [
			{ label: t('operators:controls_sub_option_7'), value: 'true' },
			{ label: t('operators:controls_sub_option_8'), value: 'false' },
		],
	},
	{
		name       : 'logo_url',
		label      : t('operators:controls_label_11'),
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
