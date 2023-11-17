import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMSearchdark,
	IcMDocument,
	IcMShip,
	IcMProfile,
	IcMServices,
	IcMCrossInCircle,
	IcMArrowDoubleLeft,
	IcMEmail,
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import { ENABLE_EXPAND_SIDE_BAR } from '../constants';
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
const SIDEBAR_CONTROLS = ['sidebar_control'];

const MOBILE_CONTROLS = ['user_chat'];

const HIDE_CONTROLS_FOR_MOBILE = ['help_desk'];

const iconMapping = ({ expandSideBar = false }) => [
	{
		name    : 'user_chat',
		content : 'Close',
		icon    : <IcMCrossInCircle width={20} height={20} />,
	},
	{
		name    : 'sidebar_control',
		content : expandSideBar ? 'Close' : 'Expand',
		icon    : expandSideBar
			? <IcMCrossInCircle width={20} height={20} />
			: <IcMArrowDoubleLeft width={20} height={20} />,
	},
	{
		name    : 'profile',
		content : 'Profile',
		icon    : <IcMProfile width={20} height={20} />,
	},
	{
		name    : 'organization',
		content : 'Organization Details',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.organization}
			alt="organization"
			width={20}
			height={20}
		/>,
	},
	{
		name    : 'flash_shipment_bookings',
		content : 'Flash Shipment Bookings',
		icon    : <IcMShip width={22} height={22} />,
	},
	{
		name    : 'user_activity',
		content : 'User Activity',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.user_activity}
			alt="activities"
			width={40}
			height={40}
		/>,
	},
	{
		name    : 'reminder',
		content : 'Reminder',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.clock}
			alt="reminder"
			width={20}
			height={20}
		/>,
	},
	{
		name    : 'notes',
		content : 'Notes',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.note}
			alt="notes"
			width={18}
			height={18}
		/>,
	},
	{
		name    : 'quick_actions',
		content : 'Quick Actions',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.quick_actions}
			alt="actions"
			width={20}
			height={20}
		/>,
	},
	{
		name    : 'spot_search',
		content : 'Spot Search',
		icon    : <IcMSearchdark width={20} height={20} />,
	},
	{
		name    : 'customer_insights',
		content : 'Customer Insights',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.customer_insights}
			alt="insights"
			width={20}
			height={20}
		/>,
	},
	{
		name    : 'documents',
		content : 'Documents',
		icon    : <IcMDocument width={20} height={20} />,
	},
	{
		name    : 'add_on_services',
		content : 'Additional Services',
		icon    : <IcMServices width={20} height={20} />,
	},
	{
		name    : 'user_mails',
		content : 'Users Mails',
		icon    : <IcMEmail width={20} height={20} />,
	},
	{
		name    : 'help_desk',
		content : 'Help Desk',
		icon    : <Image
			src={GLOBAL_CONSTANTS.image_url.help_desk}
			alt="faq"
			width={22}
			height={22}
		/>,
	},
	{
		name    : 'teams_profile',
		content : 'teams Profile',
		icon    : <IcMProfile width={20} height={20} />,
	},
];

const getIconMapping = ({
	viewType = '',
	expandSideBar = false,
	channelType = '',
	isTeams = false,
	isMobile = false,
}) => {
	const COMMON_NAVIGATIONS = COMMON_ACCESIBLE_NAVIGATIONS?.filter(
		(eachNav) => (!isMobile ? eachNav : !HIDE_CONTROLS_FOR_MOBILE.includes(eachNav)),
	);

	const CHANNEL_WISE_NAV_MAPPING = isTeams
		? [...(isMobile ? MOBILE_CONTROLS : []), 'teams_profile']
		: [
			...COMMON_NAVIGATIONS,
			...(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.extra_side_bar_navs_access || []),
			...(ENABLE_EXPAND_SIDE_BAR.includes(channelType) && !isMobile ? SIDEBAR_CONTROLS : []),
			...(isMobile ? MOBILE_CONTROLS : []),
		];

	return iconMapping({ expandSideBar })?.filter(
		(eachIcon) => CHANNEL_WISE_NAV_MAPPING.includes(eachIcon.name),
	) || [];
};

export default getIconMapping;
