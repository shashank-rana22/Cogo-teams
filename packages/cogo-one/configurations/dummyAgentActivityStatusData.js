/* eslint-disable max-len */
import { IcCGreenCircle, IcCRedCircle, IcCYelloCircle } from '@cogoport/icons-react';

export const agentActivityStatus = [
	{
		nos  : '20',
		text : 'Busy Agents',
		icon : <IcCYelloCircle />,
		key  : 'busy',
	}, {
		nos  : '20',
		text : 'Online Agents',
		icon : <IcCGreenCircle />,
		key  : 'online',
	}, {
		nos  : '20',
		text : 'Offline Agents',
		icon : <IcCRedCircle />,
		key  : 'offline',
	},
];
