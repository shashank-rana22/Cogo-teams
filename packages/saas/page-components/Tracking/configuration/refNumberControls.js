const getRefNumberControls = ({ t }) => [
	{
		name        : 'referenceNo',
		type        : 'text',
		placeholder : t('airOceanTracking:tracking_ref_number_control_label'),
		rules       : { required: t('airOceanTracking:tracking_ref_number_required_text') },
	},
];

export default getRefNumberControls;
