import { IcMTicket, IcMFtick, IcMClock } from '@cogoport/icons-react';

export const statsIconsAndData = [
	{
		icon  : <IcMClock fill="#ABB0DE" width="18px" height="18px" />,
		count : '400 s',
		label : 'Avg First Response Time',
		key   : 'two',
	},
	{
		icon  : <IcMFtick fill="#ABB0DE" width="25px" height="25px" />,
		count : '400 s',
		label : 'Avg Resolution Time',
		key   : 'three',
	},
	{
		icon  : <IcMTicket fill="#F8AEA8" width="22px" height="22px" />,
		count : '400',
		label : 'Reopened Tickets',
		key   : 'four',
	},
	{
		icon  : <IcMTicket fill="#D6B300" width="22px" height="22px" />,
		count : '2000',
		label : 'Escalated Tickets',
		key   : 'five',
	},
];
