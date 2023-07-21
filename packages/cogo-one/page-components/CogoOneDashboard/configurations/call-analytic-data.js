import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

export const CALL_ANALYTICS = [
	{
		label : 'Maximum Call duration',
		key   : 'max_call_duration',
	}, {
		label : 'Min Call duration',
		key   : 'min_call_duration',

	}, {
		label : 'Avg Call duration',
		key   : 'average_call_duration',

	}];

export const ANALYTICS_STATS = [
	{
		key  : 'incoming_answered',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.incoming_green_svg}
			alt="incoming"
			width={16}
			height={16}
		/>,
		call_type   : 'Incoming Calls',
		static_data : 'Calls',
	},
	{
		key  : 'outgoing_answered',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.outgoing_orange_svg}
			alt="outgoing"
			width={16}
			height={16}
		/>,

		call_type   : 'Outgoing Calls',
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
		call_type   : 'Missed Calls',
		static_data : 'Calls',
	},

];

export const CALL_ANALYTICS_STATS = {
	calls   : CALL_ANALYTICS,
	channel : ANALYTICS_STATS,

};
