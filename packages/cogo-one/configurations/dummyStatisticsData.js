/* eslint-disable max-len */

import { missedcallIcon, incomingcallIcon, outgoingcallIcon } from '../page-components/CogoOneDashboard/constants';

export const callAnalytics = {
	config: {
		label : 'Calls Analytics',
		value : 'call_analytics',
	},
	data: [
		{
			duration : 0,
			label    : 'Longest Chat duration',
			key      : 'longest_call_duration',
		}, {
			duration : 0,
			label    : 'Shortest Chat duration',
			key      : 'shortest_call_duration',

		}, {
			duration : 0,
			label    : 'Avg Chat duration',
			key      : 'average_call_duration',

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

export const analyticStats = [
	{
		key          : 'incoming_call',
		icon         : <img src={incomingcallIcon} alt="a" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Incoming Calls',
		customer_nos : 100,
		static_data  : 'Calls',
	},
	{
		key          : 'outgoing_call',
		icon         : <img src={outgoingcallIcon} alt="b" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Outgoing Calls',
		customer_nos : 100,
		static_data  : 'Calls',
	},
	{
		key          : 'missed_call',
		icon         : <img src={missedcallIcon} alt="c" style={{ width: '16px', height: '16px' }} />,
		channel      : 'Missed Calls',
		customer_nos : 100,
		static_data  : 'Calls',
	},

];

export const STATS = [

	{
		key     : 'calls_analytics',
		calls   : callAnalytics,
		channel : analyticStats,

	},
];
