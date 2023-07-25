import {
	IcMSearchdark,
	IcMDocument, IcMShip,
	IcMTicket,
} from '@cogoport/icons-react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const COMMON_ACCESIBLE_NAVIGATIONS = [
	'profile',
	'organization',
	'user_activity',
	'tickets',
	'documents',
	'help_desk',
	'customer_insights',
];

const ICON_MAPPING = [
	{
		name    : 'profile',
		content : 'Profile',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/profile.svg"
			alt="profile"
			style={{ width: '18px', heigh: '18px' }}
		/>,
	},
	{
		name    : 'organization',
		content : 'Organization Details',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/organ-svg.svg"
			alt="organization"
			style={{ width: '20px', heigh: '20px' }}
		/>,
	},
	{
		name    : 'flash_shipment_bookings',
		content : 'Flash Shipment Bookings',
		icon    : <IcMShip width={20} height={20} />,
	},
	{
		name    : 'user_activity',
		content : 'User Activity',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/user-actrivity.svg"
			alt="activities"
		/>,
	},
	{
		name    : 'reminder',
		content : 'Reminder',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/alarm-timer.svg"
			alt="reminder"
		/>,
	},
	{
		name    : 'notes',
		content : 'Notes',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/note.svg"
			alt="notes"
		/>,
	},
	{
		name    : 'quick_actions',
		content : 'Quick Actions',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/actions.svg"
			alt="actions"
		/>,
	},
	{
		name    : 'tickets',
		content : 'Tickets',
		icon    : <IcMTicket width={26} height={26} />,

	},
	{
		name    : 'spot_search',
		content : 'Spot Search',
		icon    : <IcMSearchdark width={16} height={16} />,
	},
	{
		name    : 'customer_insights',
		content : 'Customer Insights',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/customer-insight.svg"
			alt="insights"
		/>,
	},
	{
		name    : 'documents',
		content : 'Documents',
		icon    : <IcMDocument width={18} height={18} />,
	},
	{
		name    : 'help_desk',
		content : 'Help Desk',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/faq-icon-final.svg"
			alt="faq"
			style={{ width: '25px', heigh: '25px' }}
		/>,
	},
];

const getIconMapping = (viewType) => ICON_MAPPING.filter(
	(eachIcon) => [
		...COMMON_ACCESIBLE_NAVIGATIONS,
		...(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.extra_side_bar_navs_access || []),
	].includes(eachIcon.name),
);

export default getIconMapping;
