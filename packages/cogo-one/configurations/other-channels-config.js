import {
	IcCWhatsapp,
	IcMEmail,
} from '@cogoport/icons-react';

const OtherChannels = [
	{
		name         : 'whatsapp_number_eformat',
		icon         : <IcCWhatsapp width={20} height={20} />,
		channel_type : 'whatsapp',
		value_type   : 'number',
	},
	{
		name         : 'email',
		icon         : <IcMEmail width={20} height={20} fill="#E09B3D" />,
		channel_type : 'email',
		value_type   : 'mail',
	},
];

export default OtherChannels;
