import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

export const SATIFICATION_IMAGE_MAPPING = [
	{
		key   : 'happy_customers',
		label : 'Happy Customers',
		icon  : <Image src={GLOBAL_CONSTANTS.image_url.happy_emoji} alt="very-happy" width={25} height={25} />,
	}, {
		key   : 'neutral_customers',
		label : 'Neutral Customers',
		icon  : <Image src={GLOBAL_CONSTANTS.image_url.neutral_user_emoji} alt="happy" width={25} height={25} />,

	}, {
		key   : 'sad_customers',
		label : 'Sad Customers',
		icon  : <Image src={GLOBAL_CONSTANTS.image_url.angry_emoji} alt="sad" width={25} height={25} />,

	},
];

export const CALL_STATUS_MAPPING = {
	active   : 'online',
	inactive : 'offline',
};

export const CHAT_STATS_DATA = [
	{
		label      : 'No. of chats closed',
		percentage : 'chats_closed_percent',
		key        : 'chats_closed',
		isAgent    : false,
	},
	{
		label      : 'No. of chats assigned further',
		percentage : 'chats_assigned_percent',
		key        : 'chats_assigned',
		isAgent    : true,
	}, {
		label      : 'No. of warning chats',
		percentage : 'warning_chats_percent',
		key        : 'warning_chats',
		isAgent    : false,
	}, {
		label      : 'No. of escalated chat',
		percentage : 'escalated_chats_percent',
		key        : 'escalated_chats',
		isAgent    : true,
	},
];

export const INTENT_SERVED_DATA = [
	{
		key   : 'normal_conversation',
		label : 'Normal conversation',
	}, {
		key   : 'shipment_booking',
		label : 'Shipment Booking',

	}, {
		key   : 'trade_enquiry',
		label : 'Shipment booking',
	},
	{
		key   : 'invoice',
		label : 'Invoice',
	},
];

export const STATUS_WISE_AGENTS_MAPPING = [
	{
		label : 'Online Agents',
		name  : 'active',
	},
	{
		label : 'Offline Agents',
		name  : 'inactive',
	},
	{
		label : 'On Break Agents',
		name  : 'break',
	},
];

export const ESCALATION_ACTIVITY = [
	{
		id: 'eas1',
	},
	{
		id: 'eas2',
	},
	{
		id: 'eas3',
	},
	{
		id: 'eas4',
	},
	{
		id: 'eas5',
	},
	{
		id: 'eas6',
	},
	{
		id: 'eas7',
	},
];

export const PERFORMANCE_ACTIVITY = [
	{
		id: 'pas1',
	},
	{
		id: 'pas2',
	},
	{
		id: 'pas3',
	},
	{
		id: 'pas4',
	},
	{
		id: 'pas5',
	},
];

export const AGENT_ACTIVITY = [
	{
		id: 'aas1',
	},
	{
		id: 'aas2',
	},
];

export const LABLE_TYPE = {
	day: {
		label: 'Hour',
	},
	week: {
		label: 'Day',
	},
	month: {
		label: 'Month',
	},
};

export const FORMAT_TYPE = {
	day: {
		label    : GLOBAL_CONSTANTS.formats.date.dd,
		subLabel : GLOBAL_CONSTANTS.formats.date['MMM yyyy'],
	},
	week: {
		label    : GLOBAL_CONSTANTS.formats.date['MMM yyyy'],
		subLabel : GLOBAL_CONSTANTS.formats.date.dd,
	},
	month: {
		label    : GLOBAL_CONSTANTS.formats.date.MMM,
		subLabel : GLOBAL_CONSTANTS.formats.date.yyyy,
	},
};

export const FILTER_TAB_OPTIONS = [
	{ label: 'Day', name: 'day' },
	{ label: 'Week', name: 'week' },
	{ label: 'Month', name: 'month' },
];
