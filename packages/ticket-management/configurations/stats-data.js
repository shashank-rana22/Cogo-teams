import { IcMTicket, IcMAverage, IcMVerySad, IcMFtick, IcMClock, IcMVeryHappy } from '@cogoport/icons-react';

export const getStatsIconsAndData = ({ t }) => [
	{
		icon  : <IcMTicket fill="#ABB0DE" width="22px" height="22px" />,
		label : t('myTickets:total_tickets_label'),
		key   : 'total_tickets',
	},
	{
		icon  : <IcMClock fill="#ABB0DE" width="18px" height="18px" />,
		label : t('myTickets:average_response_time_label'),
		key   : 'average_response_time',
		type  : 'time',
	},
	{
		icon  : <IcMFtick fill="#ABB0DE" width="25px" height="25px" />,
		label : t('myTickets:average_resolution_time_label'),
		key   : 'average_resolution_time',
		type  : 'time',
	},
	{
		icon  : <IcMTicket fill="#F8AEA8" width="22px" height="22px" />,
		label : t('myTickets:escalated_label'),
		key   : 'escalated',
	},
	{
		icon  : <IcMTicket fill="#D6B300" width="22px" height="22px" />,
		label : t('myTickets:reopened_label'),
		key   : 'reopened',
	},
	{
		icon  : <IcMVeryHappy fill="#ABB0DE" width="22px" height="22px" />,
		label : t('myTickets:satisfied_customer_label'),
		key   : 'satisfied_customer',
	},
	{
		icon  : <IcMAverage fill="#ABB0DE" width="22px" height="22px" />,
		label : t('myTickets:neutral_customer_label'),
		key   : 'neutral_customer',
	},
	{
		icon  : <IcMVerySad fill="#ABB0DE" width="22px" height="22px" />,
		label : t('myTickets:dissatisfied_customer_label'),
		key   : 'dissatisfied_customer',
	},
];
