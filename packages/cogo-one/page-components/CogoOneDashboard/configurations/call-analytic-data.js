import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

export const CALL_ANALYTICS = [
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

export const ANALYTICS_STATS = [
	{
		key  : 'incoming_calls',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.incoming_green_svg}
			alt="incoming"
			width={16}
			height={16}
		/>,
		channel     : 'Incoming Calls',
		static_data : 'Calls',
	},
	{
		key  : 'outgoing_calls',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.outgoing_orange_svg}
			alt="outgoing"
			width={16}
			height={16}
		/>,

		channel     : 'Outgoing Calls',
		static_data : 'Calls',
	},
	{
		key  : 'missed_calls',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.missed_call_red_svg}
			alt="missed"
			width={16}
			height={16}
		/>,
		channel     : 'Missed Calls',
		static_data : 'Calls',
	},

];

export const callAnalyticsStatData = 	{
	calls   : CALL_ANALYTICS,
	channel : ANALYTICS_STATS,

};
