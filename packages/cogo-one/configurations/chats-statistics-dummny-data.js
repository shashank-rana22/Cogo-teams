import { dArrow, aArrow } from '../page-components/CogoOneDashboard/constants';

export const chatsStatsDummyData = [
	{
		label      : 'No. of chats closed',
		value      : 'escalate',
		image      : <img src={dArrow} alt="" />,
		number     : '8',
		percentage : -2.2,
		isAdmin    : true,
		isAgent    : true,
	},
	{
		label      : 'No. of chats assigned further',
		value      : 'assigned_chat',
		image      : <img src={aArrow} alt="" />,
		number     : '12',
		percentage : +2.2,
		isAdmin    : true,
		isAgent    : true,

	}, {
		label      : 'No. of warning chats',
		value      : 'assigned_chat',
		image      : <img src={dArrow} alt="" />,
		number     : '8',
		percentage : -2.2,
		isAdmin    : true,
		isAgent    : false,
	}, {
		label      : 'No. of escalated chat',
		value      : 'assigned_chat',
		image      : <img src={aArrow} alt="" />,
		number     : '12',
		percentage : 2.2,
		isAdmin    : true,
		isAgent    : false,
	},
];
