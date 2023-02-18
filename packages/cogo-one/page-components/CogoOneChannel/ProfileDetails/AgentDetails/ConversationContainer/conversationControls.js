import { IcCWhatsapp, IcMFacebook, IcMEmail } from '@cogoport/icons-react';

const ConservationControls = [
	{
		icon                    : <IcCWhatsapp width={20} height={20} />,
		channel_type            : 'whatsapp',
		name                    : '',
		whatsapp_number_eformat : '',
	},
	// {
	// 	icon         : <IcMFacebook width={20} height={20} fill="#1877F2" />,
	// 	name         : 'Rita rio',
	// 	organization : '@username',
	// 	message      : 'Hello My name is cogoassist from cogoport and I’ll be.....',
	// 	duration     : '10m',
	// },
	{
		icon         : <IcMEmail width={20} height={20} fill="#E09B3D" />,
		channel_type : 'email',
		name         : '',
		email        : '',
	},
	// {
	// 	icon         : <IcMFacebook width={20} height={20} fill="#1877F2" />,
	// 	name         : 'Rita rio',
	// 	organization : '@username',
	// 	message      : 'Hello My name is cogoassist from cogoport and I’ll be.....',
	// 	duration     : '10m',
	// },
	// {
	// 	icon         : <IcCWhatsapp width={20} height={20} />,
	// 	name         : 'Rita rio',
	// 	organization : 'Organisation 3',
	// 	message      : 'Hello My name is cogoassist from cogoport and I’ll be.....',
	// 	duration     : '10m',
	// },
];

export default ConservationControls;
