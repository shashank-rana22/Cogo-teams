import { happyIcon, neutralIcon, angryIcon } from '../constants';

export const satisfactionData = [
	{
		key   : 'happy_customers',
		label : 'Happy Customers',
		icon  : <img src={happyIcon} alt="Happy" />,
	}, {
		key   : 'neutral_customers',
		label : 'Neutral Customers',
		icon  : <img src={neutralIcon} alt="Happy" />,

	}, {
		key   : 'sad_customers',
		label : 'Sad Customers',
		icon  : <img src={angryIcon} alt="Happy" />,

	},
];
export const CALL_STATUS_MAPPING = {
	busy_agents    : 'on call',
	online_agents  : 'online',
	offline_agents : 'offline',
};

export const chatsStatsData = [
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
export const intentServedData = [
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
export const agentsConfigurationData = 	{
	agents_details_config: {
		busy_agents: {
			agent_label : 'Busy Agents',
			total_agent : 0,
			agents      : [],
		},
		online_agents: {
			agent_label : 'Online Agents',
			total_agent : 0,
			agents      : [],
		},
		offline_agents: {
			agent_label : 'Offline Agents',
			total_agent : 0,
			agents      : [],
		},
	},
};
export const escalationActivitySection = [
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
export const performanceActivitySection = [
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
export const agentActivitySection = [
	{
		id: 'aas1',
	},
	{
		id: 'aas2',
	},
	{
		id: 'aas3',
	},
];
export 	const performanceBtnMapping = [
	{
		key   : 'best_performance',
		label : 'Best Performance',
	},
	{
		key   : 'worst_performance',
		label : 'Worst Performance',
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
		label: 'Week',
	},
};
export const FORMAT_TYPE = {
	day: {
		label    : 'dd',
		subLabel : 'MMM yy',
	},
	week: {
		label    : 'MMM yyyy',
		subLabel : 'dd',
	},
	month: {
		label    : 'MMM',
		subLabel : 'yyyy',
	},
};
