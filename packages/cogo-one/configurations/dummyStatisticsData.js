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
		icon         : <IcCWhatsapp />,
		channel      : 'Whats App',
		customer_nos : '100 customers',
	},
	{
		key          : 'facebook',
		icon         : <IcCFacebook />,
		channel      : 'Facebook',
		customer_nos : '100 customers',
	},
	{
		key          : 'mail',
		icon         : <img src={mailIcon} alt="" />,
		channel      : 'Mail',
		customer_nos : '100 customers',
	},
	{
		key          : 'platform_chat',
		icon         : <img src={platformChatIcon} alt="" />,
		channel      : 'Platform Chat',
		customer_nos : '100 customers',
	},

];

export const analyticStats = [
	{
		key          : 'incoming_call',
		icon         : <img src={incomingcallIcon} alt="a" style={{ width: '12px', height: '12px' }} />,
		channel      : 'Incoming Calls',
		customer_nos : '100 customers',
	},
	{
		key          : 'outgoing_call',
		icon         : <img src={outgoingcallIcon} alt="b" style={{ width: '12px', height: '12px' }} />,
		channel      : 'Outgoing Calls',
		customer_nos : '100 customers',
	},
	{
		key          : 'missed_call',
		icon         : <img src={missedcallIcon} alt="c" />,
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
