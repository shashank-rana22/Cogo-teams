import { IcMTicket, IcMAverage, IcMVerySad, IcMFtick, IcMClock, IcMVeryHappy } from '@cogoport/icons-react';

export const statsIconsAndData = [

	{
		icon  : <IcMTicket fill="#ABB0DE" width="22px" height="22px" />,
		label : 'No. of Tickets',
		key   : 'total_tickets',

	},
	{
		icon  : <IcMClock fill="#ABB0DE" width="18px" height="18px" />,
		label : 'Avg First Response Time',
		key   : 'average_response_time',

	},
	{
		icon  : <IcMFtick fill="#ABB0DE" width="25px" height="25px" />,
		label : 'Avg Resolution Time',
		key   : 'average_resolution_time',

	},
	{
		icon  : <IcMTicket fill="#F8AEA8" width="22px" height="22px" />,
		label : 'Escalated Tickets',
		key   : 'escalated',

	},
	{
		icon  : <IcMTicket fill="#D6B300" width="22px" height="22px" />,
		label : 'Reopened Tickets',
		key   : 'reopened',

	},
	{
		icon  : <IcMVeryHappy fill="#ABB0DE" width="22px" height="22px" />,
		label : 'Happy customers',
		key   : 'satisfied_customer',

	},
	{
		icon  : <IcMAverage fill="#ABB0DE" width="22px" height="22px" />,
		label : 'Neutral customers',
		key   : 'neutral_customer',

	},
	{
		icon  : <IcMVerySad fill="#ABB0DE" width="22px" height="22px" />,
		label : 'Angry customers',
		key   : 'dissatisfied_customer',
	},
];
