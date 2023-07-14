import { IcMTicket, IcMFtick, IcMClock } from '@cogoport/icons-react';

export const statsMapping = [
	{
		key    : 'AverageResponseTime',
		label  : 'Avg First Response Time',
		suffix : 'sec',
		icon   : <IcMClock fill="#ABB0DE" width="22px" height="22px" />,
	},
	{
		key    : 'AverageResolutionTime',
		label  : 'Avg Resolution Time',
		suffix : 'sec',
		icon   : <IcMFtick fill="#ABB0DE" width="25px" height="25px" />,
	},
	{
		key   : 'Reopened',
		label : 'Reopened Tickets',
		icon  : <IcMTicket fill="#F8AEA8" width="25px" height="25px" />,
	},
	{
		key   : 'Escalated',
		label : 'Escalated Tickets',
		icon  : <IcMTicket fill="#D6B300" width="25px" height="25px" />,
	},
];
