import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const DEFAULT_VALUES = {
	shipmentNumber : '',
	shippingLine   : '',
	airLine        : '',
};

const headerFormControls = ({ trackingType = 'ocean',	operatorData = {}, t }) => {
	const { shippingLineData = [], airLineData = [] } = operatorData || {};

	const headerFormOceanControls = [
		{
			name        : 'shipmentNumber',
			type        : 'text',
			placeholder : t('airOceanTracking:tracking_header_form_control_label_1'),
			rules       : { required: t('airOceanTracking:tracking_header_form_control_required_text_1') },
		},
		{
			name     : 'shippingLine',
			type     : 'async_select',
			asyncKey : 'shipping_lines',

			placeholder : t('airOceanTracking:tracking_header_form_control_label_2'),
			rules       : { required: t('airOceanTracking:tracking_header_form_control_required_text_2') },
		},
	];

	const headerFormAirControls = [
		{
			name        : 'shipmentNumber',
			type        : 'text',
			placeholder : t('airOceanTracking:tracking_header_form_control_label_3'),
			rules       : {
				required : t('airOceanTracking:tracking_header_form_control_required_text_3'),
				pattern  : {
					value   : GLOBAL_CONSTANTS.regex_patterns.airway_bill_number,
					message : t('airOceanTracking:tracking_header_form_control_invalid_airline_text'),
				},
			},
		},
		{
			name        : 'airLine',
			type        : 'async_select',
			asyncKey    : 'list_operators',
			placeholder : t('airOceanTracking:tracking_header_form_control_label_4'),
			rules       : { required: t('airOceanTracking:tracking_header_form_control_required_text_4') },
			params      : {
				filters: {
					operator_type: 'airline',
				},
			},

		},
	];

	const OPTION_MAPPING = {
		ocean : shippingLineData,
		air   : airLineData,
	};

	const controls = trackingType === 'ocean' ? headerFormOceanControls : headerFormAirControls;

	return controls.map((control) => {
		if (control.name === 'shippingLine' || control.name === 'airLine') {
			return {
				...control,
				options: OPTION_MAPPING[trackingType],
			};
		}

		return control;
	});
};

export default headerFormControls;
export { DEFAULT_VALUES };
