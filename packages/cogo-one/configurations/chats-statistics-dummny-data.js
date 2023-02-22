import { dArrow, aArrow } from '../page-components/CogoOneDashboard/constants';

export const chatsStatsDummyData = [
	{
		label      : 'No. of escalated chat',
		value      : 'escalate',
		image      : <img src={dArrow} alt="" />,
		number     : '8',
		percentage : '-2.2%',
	},
	{
		label      : 'No. of chats assigned further',
		value      : 'assigned_chat',
		image      : <img src={aArrow} alt="" />,
		number     : '12',
		percentage : '+2.2%',
	}, {
		label      : 'No. of warning chats',
		value      : 'assigned_chat',
		image      : <img src={dArrow} alt="" />,
		number     : '8',
		percentage : '-2.2%',
	}, {
		label      : 'No. of escalated chat',
		value      : 'assigned_chat',
		image      : <img src={aArrow} alt="" />,
		number     : '12',
		percentage : '+2.2%',
	},
];
