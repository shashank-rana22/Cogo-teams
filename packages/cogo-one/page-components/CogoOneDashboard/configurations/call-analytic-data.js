import { IcMIncomingcall, IcMMissedcall, IcMOutgoing } from '@cogoport/icons-react';

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
		icon : <IcMIncomingcall
			fill="#abcd62"
			width={18}
			height={18}
		/>,
		call_type   : 'Incoming Calls',
		static_data : 'Calls',
	},
	{
		key  : 'outgoing_answered',
		icon : <IcMOutgoing
			fill="#f68b21"
			width={16}
			height={16}
		/>,
		call_type   : 'Outgoing Calls',
		static_data : 'Calls',
	},
	{
		key  : 'missed_calls',
		icon : <IcMMissedcall
			fill="#ee3425"
			width={20}
			height={20}
		/>,
		call_type   : 'Missed Calls',
		static_data : 'Calls',
	},

];

export const CALL_ANALYTICS_STATS = {
	calls   : CALL_ANALYTICS,
	channel : ANALYTICS_STATS,

};
