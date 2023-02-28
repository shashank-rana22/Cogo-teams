import { missedcallIcon, incomingcallIcon, outgoingcallIcon } from '../page-components/CogoOneDashboard/constants';

export const callAnalytics = [
	{
		label : 'Longest Chat duration',
		key   : 'longest_call_duration',
	}, {
		label : 'Shortest Chat duration',
		key   : 'shortest_call_duration',

	}, {
		label : 'Avg Chat duration',
		key   : 'average_call_duration',

	}];

export const analyticStats = [
	{
		key         : 'incoming_calls',
		icon        : <img src={incomingcallIcon} alt="a" style={{ width: '16px', height: '16px' }} />,
		channel     : 'Incoming Calls',
		static_data : 'Calls',
	},
	{
		key         : 'outgoing_calls',
		icon        : <img src={outgoingcallIcon} alt="b" style={{ width: '16px', height: '16px' }} />,
		channel     : 'Outgoing Calls',
		static_data : 'Calls',
	},
	{
		key         : 'missed_calls',
		icon        : <img src={missedcallIcon} alt="c" style={{ width: '16px', height: '16px' }} />,
		channel     : 'Missed Calls',
		static_data : 'Calls',
	},

];

export const callAnalyticsStatData = 	{
	calls   : callAnalytics,
	channel : analyticStats,

};
