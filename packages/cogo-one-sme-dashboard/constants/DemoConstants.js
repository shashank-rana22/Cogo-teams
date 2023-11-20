import { IcMPlatformDemo, IcCCogo } from '@cogoport/icons-react';

export const demoConstants = [
	{
		id      : 'chats_data',
		header  : 'Chats Data',
		icon    : <IcCCogo className="chat_data_icon" />,
		options : [
			{
				id    : 'chats_assigned',
				label : 'Total Chats assigned',
				count : 'chats_assigned',
			},
			{
				id    : 'rates_enquiry',
				label : 'Rates Enquiry (bot)',
				count : 'bot_search_count',
			},
			{
				id    : 'messages_sent_by_agent',
				label : 'Messages Sent By Agent',
				count : 'message_by_agent',
			},
			{
				id    : 'messages_sent_by_bot',
				label : 'Messages Sent By Bot',
				count : 'message_by_bot',
			},
		],
	},
	{
		id      : 'demo_data',
		header  : 'Demo Data',
		icon    : <IcMPlatformDemo className="platform_demo_icon" />,
		options : [
			{
				id    : 'demo_scheduled',
				label : 'Demo Scheduled',
				count : 'demo_scheduled',
			},
			{
				id    : 'demo_conducted',
				label : 'Demo Conducted',
				count : 'demo_conducted',
			},
			{
				id    : 'average_demos_by_agent',
				label : 'Average Demo\'s Per Agent',
				count : 'per_agent_demos',
			},
		],
	},
];
