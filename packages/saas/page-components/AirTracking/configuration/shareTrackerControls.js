import patterns from '@/ui/commons/configurations/patterns';

const getShareTrackerControls = ({ t }) => [
	{
		name        : 'name',
		label       : t('airOceanTracking:tracking_share_list_config_label_1'),
		type        : 'text',
		size        : 'sm',
		placeholder : t('airOceanTracking:tracking_share_list_config_placeholder_1'),
		rules       : { required: t('airOceanTracking:tracking_share_list_config_name_required_text') },
	},
	{
		name        : 'email',
		label       : t('airOceanTracking:tracking_share_list_config_label_4'),
		type        : 'text',
		size        : 'sm',
		placeholder : t('airOceanTracking:tracking_share_list_config_placeholder_2'),
		rules       : {
			required : t('airOceanTracking:tracking_share_list_config_email_required_text'),
			pattern  : {
				value   : patterns.EMAIL,
				message : t('airOceanTracking:tracking_share_list_config_invalid_email_text'),
			},
		},
	},
];

export default getShareTrackerControls;
