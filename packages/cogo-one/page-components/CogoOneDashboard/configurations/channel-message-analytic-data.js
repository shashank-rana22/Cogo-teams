import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWhatsapp, IcCFacebook } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

export const MESSAGE_ANALYTICS = [
	{
		key   : 'longest_call_duration',
		label : 'Longest Chat duration',
	}, {
		key   : 'shortest_call_duration',
		label : 'Shortest Chat duration',
	}, {
		key   : 'average_call_duration',
		label : 'Avg Chat duration',
	},
];

export const CHANNEL_STATS = [
	{
		key         : 'whatsapp',
		icon        : <IcCWhatsapp width="20px" height="20px" />,
		channel     : 'Whats App',
		static_data : 'customer',
	},
	{
		key         : 'facebook',
		icon        : <IcCFacebook width="20px" height="20px" />,
		channel     : 'Facebook',
		static_data : 'customer',
	},
	{
		key         : 'mail',
		icon        : <Image src={GLOBAL_CONSTANTS.image_url.email_svg} alt="mail" width={16} height={16} />,
		channel     : 'Mail',
		static_data : 'customer',
	},
	{
		key  : 'platform_chat',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.platform_chat_svg}
			alt="platform"
			width={16}
			height={16}
		/>,
		channel     : 'Platform Chat',
		static_data : 'customer',
	},

];

export const CHANNEL_MESSAGE_ANALYTICS_MAPPING_DATA = {
	calls   : MESSAGE_ANALYTICS,
	channel : CHANNEL_STATS,

};
