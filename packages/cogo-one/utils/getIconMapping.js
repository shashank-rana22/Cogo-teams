import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMSearchdark,
	IcMDocument, IcMShip,
	IcMTicket,
	IcMProfile,
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
		icon    : <IcMProfile width={18} height={18} />,
	},
	{
		name    : 'organization',
		content : 'Organization Details',
		icon    : <img
			src={GLOBAL_CONSTANTS.image_url.organization}
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
			src={GLOBAL_CONSTANTS.image_url.user_activity}
			alt="activities"
		/>,
	},
	{
		name    : 'reminder',
		content : 'Reminder',
		icon    : <img
			src={GLOBAL_CONSTANTS.image_url.clock}
			alt="reminder"
		/>,
	},
	{
		name    : 'notes',
		content : 'Notes',
		icon    : <img
			src={GLOBAL_CONSTANTS.image_url.note}
			alt="notes"
		/>,
	},
	{
		name    : 'quick_actions',
		content : 'Quick Actions',
		icon    : <img
			src={GLOBAL_CONSTANTS.image_url.quick_actions}
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
			src={GLOBAL_CONSTANTS.image_url.customer_insights}
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
			src={GLOBAL_CONSTANTS.image_url.help_desk}
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
