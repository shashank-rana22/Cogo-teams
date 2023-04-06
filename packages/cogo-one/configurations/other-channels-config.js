import {
	IcCTelegram, IcMPlatformchat,
	IcCWhatsapp,
	IcMEmail,
} from '@cogoport/icons-react';

const OtherChannels = [
	{
		name               : 'whatsapp_number_eformat',
		icon               : <IcCWhatsapp width={20} height={20} />,
		other_channel_type : 'whatsapp',
		value_type         : 'number',
		id_name            : 'whatsapp_id',
	},
	{
		name               : 'email',
		icon               : <IcMEmail width={20} height={20} fill="#E09B3D" />,
		other_channel_type : 'email',
		value_type         : 'mail',
	},
	{
		name               : 'platform_chat',
		icon               : <IcMPlatformchat width={20} height={20} />,
		other_channel_type : 'platform_chat',
		value_type         : 'name',
		id_name            : 'platform_chat_id',
	},
	{
		name               : 'telegram',
		icon               : <IcCTelegram width={20} height={20} fill="#E09B3D" />,
		other_channel_type : 'telegram',
		value_type         : 'number',
		id_name            : 'telegram_id',
	},
];

export default OtherChannels;
