/* eslint-disable max-len */
import { IcCWhatsapp, IcCFacebook } from '@cogoport/icons-react';

import { mailIcon, platformChatIcon } from '../page-components/CogoOneDashboard/constants';

export const messageAnalytics = [
	{
		key      : 'longest_call_duration',
		duration : 25,
		label    : 'Longest Chat duration',
	}, {
		key      : 'shortest_call_duration',
		duration : 5,
		label    : 'Shortest Chat duration',
	}, {
		key      : 'average_call_duration',
		duration : 15,
		label    : 'Avg Chat duration',
	},
];

export const channelStats = [
	{
		key          : 'whatsapp',
		icon         : <IcCWhatsapp width="20px" height="20px" />,
		channel      : 'Whats App',
		customer_nos : 100,
		static_data  : 'customer',
	},
	{
		key          : 'facebook',
		icon         : <IcCFacebook width="20px" height="20px" />,
		channel      : 'Facebook',
		customer_nos : 100,
		static_data  : 'customer',
	},
	{
		key          : 'mail',
		icon         : <img src={mailIcon} alt="" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Mail',
		customer_nos : 100,
		static_data  : 'customer',
	},
	{
		key          : 'platform_chat',
		icon         : <img src={platformChatIcon} alt="" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Platform Chat',
		customer_nos : 100,
		static_data  : 'customer',
	},

];

export const channelMessageAnayticsData = {
	calls   : messageAnalytics,
	channel : channelStats,

};
