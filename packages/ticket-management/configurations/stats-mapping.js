import { IcMTicket, IcMFtick, IcMClock } from '@cogoport/icons-react';

export const statsMapping = ({ t }) => [
	{
		key   : 'AverageResponseTime',
		label : t('myTickets:average_response_time_label'),
		icon  : <IcMClock fill="#ABB0DE" width="22px" height="22px" />,
		type  : 'time',
	},
	{
		key   : 'AverageResolutionTime',
		label : t('myTickets:average_resolution_time_label'),
		icon  : <IcMFtick fill="#ABB0DE" width="25px" height="25px" />,
		type  : 'time',
	},
	{
		key   : 'Reopened',
		label : t('myTickets:reopened_label'),
		icon  : <IcMTicket fill="#F8AEA8" width="25px" height="25px" />,
	},
	{
		key   : 'Escalated',
		label : t('myTickets:escalated_label'),
		icon  : <IcMTicket fill="#D6B300" width="25px" height="25px" />,
	},
];
