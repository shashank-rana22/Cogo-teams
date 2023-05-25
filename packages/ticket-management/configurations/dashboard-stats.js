import { IcMTicket, IcMFtick, IcMClock } from '@cogoport/icons-react';

export const statsIconsAndData = [
	{
		key   : 'AverageResponseTime',
		label : 'Avg First Response Time',
		icon  : <IcMClock fill="#ABB0DE" width="18px" height="18px" />,
	},
	{
		key   : 'AverageResolutionTime',
		label : 'Avg Resolution Time',
		icon  : <IcMFtick fill="#ABB0DE" width="25px" height="25px" />,
	},
	{
		key   : 'four',
		label : 'Reopened Tickets',
		icon  : <IcMTicket fill="#F8AEA8" width="22px" height="22px" />,
	},
	{
		key   : 'five',
		label : 'Escalated Tickets',
		icon  : <IcMTicket fill="#D6B300" width="22px" height="22px" />,
	},
];
