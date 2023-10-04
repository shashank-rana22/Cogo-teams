import { IcMCall, IcMShip, IcMSettings } from '@cogoport/icons-react';

export const TABS = ['event', 'meeting'];

export const LABEL = {
	event   : 'Reminder',
	meeting : 'Meeting',
};

export const EVENT_TYPES = [
	{
		key  : 'call_customer',
		icon : <IcMCall width={12} height={12} />,
	},
	{
		key  : 'send_quotation',
		icon : <IcMShip width={12} height={12} />,
	},
	{
		key  : 'others',
		icon : <IcMSettings width={12} height={12} />,
	},
];
