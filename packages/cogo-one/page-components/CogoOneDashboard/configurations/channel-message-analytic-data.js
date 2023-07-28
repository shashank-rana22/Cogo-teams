import { IcCWhatsapp, IcCFacebook, IcMEmail, IcMPlatformchat } from '@cogoport/icons-react';

export const CHANNEL_STATS = [
	{
		key         : 'whatsapp',
		icon        : <IcCWhatsapp width={22} height={22} />,
		channel     : 'Whats App',
		static_data : 'customer',
	},
	{
		key         : 'facebook',
		icon        : <IcCFacebook width={20} height={20} />,
		channel     : 'Facebook',
		static_data : 'customer',
	},
	{
		key         : 'mail',
		icon        : <IcMEmail fill="#E09B3D" width={20} height={20} />,
		channel     : 'Mail',
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
