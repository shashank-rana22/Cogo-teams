/* eslint-disable max-len */
import { IcCWhatsapp, IcCFacebook } from '@cogoport/icons-react';

import { mailIcon, platformChatIcon, missedcallIcon, incomingcallIcon, outgoingcallIcon } from '../page-components/CogoOneDashboard/constants';

export const messageAnalytics = {
	config: {
		label : 'Channels Messages Analytics',
		value : 'message_analytics',
	},
	data: [
		{
			duration : '25 min',
			text     : 'Longest Chat duration',
		}, {
			duration : '05 min',
			text     : 'Shortest Chat duration',
		}, {
			duration : '15 min',
			text     : 'Avg Chat duration',
		}],
};

export const callAnalytics = {
	config: {
		label : 'Calls Analytics',
		value : 'call_analytics',
	},
	data: [
		{
			duration : '25 min',
			text     : 'Longest Chat duration',
		}, {
			duration : '05 min',
			text     : 'Shortest Chat duration',
		}, {
			duration : '15 min',
			text     : 'Avg Chat duration',
		}],
};

export const callAnalyticsData = [
	{
		duration : '25 min',
		text     : 'Longest Chat duration',
	}, {
		duration : '05 min',
		text     : 'Shortest Chat duration',
	}, {
		duration : '15 min',
		text     : 'Avg Chat duration',
	}];

export const channelStats = [
	{
		key          : 'whatsapp',
		icon         : <IcCWhatsapp width="20px" height="20px" />,
		channel      : 'Whats App',
		customer_nos : '100 customers',
	},
	{
		key          : 'facebook',
		icon         : <IcCFacebook width="20px" height="20px" />,
		channel      : 'Facebook',
		customer_nos : '100 customers',
	},
	{
		key          : 'mail',
		icon         : <img src={mailIcon} alt="" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Mail',
		customer_nos : '100 customers',
	},
	{
		key          : 'platform_chat',
		icon         : <img src={platformChatIcon} alt="" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Platform Chat',
		customer_nos : '100 customers',
	},

];

export const analyticStats = [
	{
		key          : 'incoming_call',
		icon         : <img src={incomingcallIcon} alt="a" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Incoming Calls',
		customer_nos : '100 customers',
	},
	{
		key          : 'outgoing_call',
		icon         : <img src={outgoingcallIcon} alt="b" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Outgoing Calls',
		customer_nos : '100 customers',
	},
	{
		key          : 'missed_call',
		icon         : <img src={missedcallIcon} alt="c" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Missed Calls',
		customer_nos : '100 customers',
	},

];

export const STATS = [
	{
		calls   : messageAnalytics,
		channel : channelStats,

	},
	{
		calls   : callAnalytics,
		channel : analyticStats,

	},
];
