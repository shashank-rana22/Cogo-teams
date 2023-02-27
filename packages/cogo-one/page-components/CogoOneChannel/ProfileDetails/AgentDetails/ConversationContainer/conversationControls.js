import { IcCWhatsapp, IcMEmail } from '@cogoport/icons-react';

const ConservationControls = [
	{
		icon                    : <IcCWhatsapp width={20} height={20} />,
		channel_type            : 'whatsapp',
		name                    : '',
		whatsapp_number_eformat : '',
	},

	{
		icon         : <IcMEmail width={20} height={20} fill="#E09B3D" />,
		channel_type : 'email',
		name         : '',
		email        : '',
	},

];

export default ConservationControls;
