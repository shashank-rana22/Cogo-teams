import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMVeryHappy, IcMAverage, IcMVerySad } from '@cogoport/icons-react';
import { startOfDay, startOfWeek, startOfMonth } from '@cogoport/utils';

export const SATIFICATION_IMAGE_MAPPING = [
	{
		key   : 'happy',
		label : 'Happy Customers',
		icon  : <IcMVeryHappy width={25} height={25} fill="#ABCD62" />,
	}, {
		key   : 'neutral',
		label : 'Neutral Customers',
		icon  : <IcMAverage fill="#FCDC00" width={25} height={25} />,

	}, {
		key   : 'sad',
		label : 'Sad Customers',
		icon  : <IcMVerySad fill="#EE3425" width={25} height={25} />,

	},
];

export const CALL_STATUS_MAPPING = {
	active   : 'online',
	inactive : 'offline',
};

export const CHAT_STATS_DATA = [
	{
		label   : 'No. of chats closed',
		key     : 'close_conversation',
		isAgent : true,
	},
	{
		label   : 'No. of chats active',
		key     : 'active',
		isAgent : true,
	}, {
		label   : 'No. of warning chats',
		key     : 'warning',
		isAgent : true,
	}, {
		label   : 'No. of escalated chat',
		key     : 'escalated',
		isAgent : true,
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

export const DATE_FILTER_MAPPING = {
	day   : startOfDay,
	week  : startOfWeek,
	month : startOfMonth,

};