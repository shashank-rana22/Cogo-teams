import { IcCWhatsapp, IcMEmail, IcCTelegram, IcMPlatformchat } from '@cogoport/icons-react';

export const CHANNEL_STATS = [
	{
		key         : 'whatsapp',
		icon        : <IcCWhatsapp width={22} height={22} />,
		channel     : 'Whats App',
		static_data : 'customer',
	},
	{
		key         : 'mail',
		icon        : <IcMEmail width={20} height={20} fill="#E09B3D" />,
		channel     : 'Mail',
		static_data : 'customer',
	},
	{
		key         : 'telegram',
		icon        : <IcCTelegram width={20} height={20} />,
		channel     : 'Telegram',
		static_data : 'customer',
	},
	{
		key  : 'platform_chat',
		icon : <IcMPlatformchat
			fill="#2C3E50"
			width={20}
			height={20}
		/>,
		channel     : 'Platform Chat',
		static_data : 'customer',
	},

];
