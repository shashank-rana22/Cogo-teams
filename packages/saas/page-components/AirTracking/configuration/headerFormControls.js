import patterns from '@/ui/commons/configurations/patterns';

const defaultValues = {
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
			name        : 'shippingLine',
			type        : 'select',
			asyncKey    : 'shippingline_list',
			initialCall : true,
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
					value   : patterns.AIRWAY_BILL_NO,
					message : t('airOceanTracking:tracking_header_form_control_invalid_airline_text'),
				},
			},
		},
		{
			name        : 'airLine',
			type        : 'select',
			asyncKey    : 'airline_list',
			initialCall : true,
			placeholder : t('airOceanTracking:tracking_header_form_control_label_4'),
			rules       : { required: t('airOceanTracking:tracking_header_form_control_required_text_4') },

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
export { defaultValues };
