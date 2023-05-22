import { IcMTicket, IcMAverage, IcMVerySad, IcMFtick, IcMClock, IcMVeryHappy } from '@cogoport/icons-react';

export const statsIconsAndData = [

	{
		icon  : <IcMTicket fill="#ABB0DE" width="22px" height="22px" />,
		count : '4,000',
		label : 'No. of Tickets',
		key   : 'one',

	},
	{
		icon  : <IcMClock fill="#ABB0DE" width="22px" height="22px" />,
		count : '400 s',
		label : 'Avg First Response Time',
		key   : 'two',

	},
	{
		icon  : <IcMFtick fill="#ABB0DE" width="22px" height="22px" />,
		count : '400 s',
		label : 'Avg Resolution Time',
		key   : 'three',

	},
	{
		icon  : <IcMTicket fill="#F8AEA8" width="22px" height="22px" />,
		count : '400 s',
		label : 'Escalated Tickets',
		key   : 'four',

	},
	{
		icon  : <IcMTicket fill="#D6B300" width="22px" height="22px" />,
		count : '2000',
		label : 'Reopened Tickets',
		key   : 'five',

	},
	{
		icon  : <IcMVeryHappy fill="#ABB0DE" width="22px" height="22px" />,
		count : '240',
		label : 'Happy customers',
		key   : 'six',

	},
	{
		icon  : <IcMAverage fill="#ABB0DE" width="22px" height="22px" />,
		count : '2000',
		label : 'Neutral customers',
		key   : 'seven',

	},
	{
		icon  : <IcMVerySad fill="#ABB0DE" width="22px" height="22px" />,
		count : '2000',
		label : 'Angry customers',
		key   : 'eight',
	},
];
