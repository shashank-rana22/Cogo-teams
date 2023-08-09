import { IcCWhatsapp, IcCZalo, IcCTelegram, IcMPlatformchat } from '@cogoport/icons-react';

export const CHANNEL_STATS = [
	{
		key         : 'whatsapp',
		icon        : <IcCWhatsapp width={22} height={22} />,
		channel     : 'Whats App',
		static_data : 'customer',
	},
	{
		key         : 'zalo',
		icon        : <IcCZalo width={20} height={20} />,
		channel     : 'Zalo',
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
