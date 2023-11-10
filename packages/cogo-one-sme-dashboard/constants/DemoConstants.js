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
			},
			{
				id    : 'rates_enquiry',
				label : 'Rates Enquiry (bot)',
			},
			{
				id    : 'messages_sent_by_agent',
				label : 'Messages Sent By Agent',
			},
			{
				id    : 'messages_sent_by_bot',
				label : 'Messages Sent By Bot',
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
			},
			{
				id    : 'demo_conducted',
				label : 'Demo Conducted',
			},
			{
				id    : 'average_demos_by_agent',
				label : 'Average Demo\'s Per Agent',
			},
		],
	},
];
