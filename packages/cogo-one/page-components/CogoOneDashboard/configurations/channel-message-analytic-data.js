import { IcCWhatsapp, IcCFacebook } from '@cogoport/icons-react';

import { mailIcon, platformChatIcon } from '../constants';

export const messageAnalytics = [
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

export const channelStats = [
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
		icon        : <img src={mailIcon} alt="" style={{ width: '16px', height: '16px' }} />,
		channel     : 'Mail',
		static_data : 'customer',
	},
	{
		key         : 'platform_chat',
		icon        : <img src={platformChatIcon} alt="" style={{ width: '16px', height: '16px' }} />,
		channel     : 'Platform Chat',
		static_data : 'customer',
	},

];

export const channelMessageAnayticsData = {
	calls   : messageAnalytics,
	channel : channelStats,

};
