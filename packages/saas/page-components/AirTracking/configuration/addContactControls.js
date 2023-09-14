import { IcMEmail, IcMUserAllocations } from '@cogoport/icons-react';

import patterns from '@/ui/commons/configurations/patterns';

const getAddContactControls = ({ t }) => [
	{
		name        : 'name',
		type        : 'text',
		label       : `${t('airOceanTracking:tracking_add_contact_control_label_1')} *`,
		placeholder : t('airOceanTracking:tracking_add_contact_control_placeholder_1'),
		prefix      : <IcMUserAllocations />,
		rules       : {
			required  : t('airOceanTracking:tracking_add_contact_control_name_required_text'),
			maxLength : { value: 16, message: t('airOceanTracking:tracking_add_contact_control_invalid_name_text') },
		},
	},
	{
		name        : 'email',
		label       : `${t('airOceanTracking:tracking_add_contact_control_label_2')} *`,
		type        : 'text',
		placeholder : t('airOceanTracking:tracking_add_contact_control_placeholder_2'),
		prefix      : <IcMEmail />,
		rules       : {
			required : t('airOceanTracking:tracking_add_contact_control_email_required_text'),
			pattern  : {
				value   : patterns.EMAIL,
				message : t('airOceanTracking:tracking_add_contact_control_invalid_email_text'),
			},
		},
	},
	{
		name            : 'mobile_no',
		label           : `${t('airOceanTracking:tracking_add_contact_control_label_3')} *`,
		type            : 'mobile_number',
		isInputGroup    : true,
		showCountryName : false,
		placeholder     : t('airOceanTracking:tracking_add_contact_control_placeholder_3'),
		rules           : {
			required : t('airOceanTracking:tracking_add_contact_control_mobile_required_text'),
			pattern  : {
				value   : patterns.MOBILE,
				message : t('airOceanTracking:tracking_add_contact_control_invalid_mobile_text'),
			},
		},
	},
	{
		name        : 'company',
		label       : t('airOceanTracking:tracking_add_contact_control_label_4'),
		type        : 'text',
		placeholder : t('airOceanTracking:tracking_add_contact_control_placeholder_4'),

	},
];

export default getAddContactControls;
