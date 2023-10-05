import { IcMCall, IcMShip, IcMSettings, IcMAgentManagement } from '@cogoport/icons-react';

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

export const ICON_MAPPING = {
	call_customer: {
		icon  : <IcMCall width={16} height={16} />,
		color : '#FCEEDF',
	},
	send_quotation: {
		icon  : <IcMShip width={16} height={16} />,
		color : '#F3FAFA',
	},
	others: {
		icon  : <IcMSettings width={16} height={16} />,
		color : '#F3FAFA',
	},
	default: {
		icon  : <IcMAgentManagement width={16} height={16} />,
		color : '#F3FAFA',
	},
};

export const HEADER_MAPPING = {
	call_customer: {
		title : 'Call',
		icon  : <IcMCall width={10} height={10} />,
		color : '#FCEEDF',
	},
	send_quotation: {
		title : 'Shipping',
		icon  : <IcMShip width={10} height={10} />,
		color : '#F3FAFA',
	},
	others: {
		title : 'Other',
		icon  : <IcMSettings width={10} height={10} />,
		color : '#FCEEDF',
	},
	default: {
		title : 'Meeting',
		icon  : <IcMAgentManagement width={10} height={10} />,
		color : '#F3FAFA',
	},
};
