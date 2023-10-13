const getDetDemControls = ({ t }) => [
	{
		name        : 'origin_detention',
		label       : t('airOceanTracking:detention_demurage_controls_label_1'),
		type        : 'number',
		arrow       : false,
		placeholder : t('airOceanTracking:detention_demurage_controls_placeholder_1'),
		suffix      : t('airOceanTracking:detention_demurage_controls_suffix_1'),
		rules       : {
			required : t('airOceanTracking:detention_demurage_controls_required_text_1'),
			maxValue : {
				value   : 30,
				message : t('airOceanTracking:detention_demurage_controls_invalid_text_1'),
			},
		},
	},
	{
		name        : 'destination_detention',
		label       : t('airOceanTracking:detention_demurage_controls_label_2'),
		type        : 'number',
		arrow       : false,
		placeholder : t('airOceanTracking:detention_demurage_controls_placeholder_1'),
		suffix      : t('airOceanTracking:detention_demurage_controls_suffix_1'),
		rules       : {
			required : t('airOceanTracking:detention_demurage_controls_required_text_2'),
			maxValue : {
				value   : 30,
				message : t('airOceanTracking:detention_demurage_controls_invalid_text_1'),
			},
		},
	},
	{
		name        : 'destination_demurrage',
		type        : 'number',
		arrow       : false,
		placeholder : t('airOceanTracking:detention_demurage_controls_placeholder_1'),
		suffix      : t('airOceanTracking:detention_demurage_controls_suffix_2'),
		rules       : {
			required : t('airOceanTracking:detention_demurage_controls_required_text_3'),
			maxValue : {
				value   : 30,
				message : t('airOceanTracking:detention_demurage_controls_invalid_text_1'),
			},
		},
	},
];

export default getDetDemControls;
