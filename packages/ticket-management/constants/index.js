export const SERVICE_API_MAPPING = {
	missing_id: {
		fcl_freight     : 'list_fcl_freight_rate_requests',
		lcl_freight     : 'list_lcl_freight_rate_requests',
		air_freight     : 'list_air_freight_rate_requests',
		ftl_freight     : 'list_ftl_freight_rate_requests',
		ltl_freight     : 'list_ltl_freight_rate_requests',
		fcl_customs     : 'list_fcl_customs_rate_requests',
		lcl_customs     : 'list_lcl_customs_rate_requests',
		fcl_cfs         : 'list_fcl_cfs_rate_requests',
		trailer_freight : 'list_trailer_freight_rate_requests',
		haulage_freight : 'list_haulage_freight_rate_requests',
		air_customs     : 'list_air_customs_rate_requests',
	},
	dislike_id: {
		fcl_freight     : 'list_fcl_freight_rate_feedbacks',
		lcl_freight     : 'list_lcl_freight_rate_feedbacks',
		air_freight     : 'list_air_freight_rate_feedbacks',
		ftl_freight     : 'list_ftl_freight_rate_feedbacks',
		ltl_freight     : 'list_ltl_freight_rate_feedbacks',
		fcl_customs     : 'list_fcl_customs_rate_feedbacks',
		lcl_customs     : 'list_lcl_customs_rate_feedbacks',
		trailer_freight : 'list_trailer_freight_rate_feedbacks',
		haulage_freight : 'list_haulage_freight_rate_feedbacks',
		air_customs     : 'list_air_customs_rate_feedbacks',
		box             : 'list_air_freight_rate_feedbacks',
		crate           : 'list_air_freight_rate_feedbacks',
		pallet          : 'list_air_freight_rate_feedbacks',
		loose           : 'list_air_freight_rate_feedbacks',
	},
};

export const STATUS_MAPPING = {
	pending           : 'pending',
	reject_requested  : 'pending',
	resolve_requested : 'pending',
	closed            : 'closed',
	rejected          : 'closed',
	overdue           : 'overdue',
	unresolved        : 'open',
	escalated         : 'escalated',
};

export const STATUS_TYPE_MAPPING = {
	resolve: {
		Status : 'resolved',
		Type   : 'mark_as_resolved',
	},
	resolve_request: {
		Status : 'resolve_requested',
		Type   : 'resolve_requested',
	},
	approve: {
		Status : 'resolved',
		Type   : 'mark_as_resolved',
	},
	reject: {
		Status : 'unresolved',
		Type   : 'resolution_rejected',
	},
	reopen: {
		Status : 'reopened',
		Type   : 'reopened',
	},
	escalate: {
		Status : 'escalated',
		Type   : 'escalated',
	},
};

export const TICKET_SECTION_MAPPING = {
	Open: {
		Statuses: 'unresolved',
	},
	Escalated: {
		Statuses: 'escalated',
	},
	'Closure Pending': {
		Statuses: 'pending,reject_requested,resolve_requested',
	},
	Closed: {
		Statuses: 'closed,rejected,overdue',
	},
};

export const TOTAL_FEEDBACK_KEY = 'TotalFeedback';

export const MESSAGE_MAPPING = {
	text    : ['text', 'template', 'interactive'],
	media   : ['image', 'audio', 'video'],
	contact : ['contact'],
};

export const TICKET_OPEN_STATUS = [
	'unresolved',
	'pending',
	'reject_requested',
	'resolve_requested',
];

export const getStatusLabelMapping = ({ t }) => ({
	open: {
		label : t('myTickets:open_status'),
		color : '#D6B300',
	},
	closed: {
		label : t('myTickets:closed_status'),
		color : '#009900',
	},
	overdue: {
		label : t('myTickets:overdue_status'),
		color : '#8d99ae',
	},
	pending: {
		label : t('myTickets:pending_status'),
		color : '#F68B21',
	},
	escalated: {
		label : t('myTickets:escalated_status'),
		color : '#F37166',
	},
});

export const PRIORITY_MAPPING = {
	high   : 'high',
	medium : 'medium',
	low    : 'low',
};

export const REQUIRED_ROLES = ['partner-roles', 'partner-users', 'stakeholders'];
export const HIDE_ASSIGN_FIELD = ['id_creator', 'stakeholders'];

export const getSpectatorTypeOptions = ({ t }) => [
	{ label: t('myTickets:spectator_type_1'), value: 'reviewer' },
	{ label: t('myTickets:spectator_type_2'), value: 'agent' },
	{ label: t('myTickets:spectator_type_3'), value: 'closure_authorizer' },
	{ label: t('myTickets:spectator_type_4'), value: 'configuration_owner' },
	{ label: t('myTickets:spectator_type_5'), value: 'assigned_to_my_team' },
	{ label: t('myTickets:spectator_type_6'), value: 'raised_by_my_team' },
];

export const getTicketActionLabel = ({ t, type }) => {
	const ACTIONS = {
		resolve_requested : t('myTickets:resolve_requested'),
		resolve_request   : t('myTickets:resolve_request'),
		unresolved        : t('myTickets:unresolved'),
		escalated         : t('myTickets:escalated'),
		reassign          : t('myTickets:reassign'),
		escalate          : t('myTickets:escalate'),
		resolve           : t('myTickets:resolve'),
		pending           : t('myTickets:pending'),
		approve           : t('myTickets:approve'),
		reject            : t('myTickets:reject'),
		reopen            : t('myTickets:reopen'),
	};

	return ACTIONS[type];
};

export const getRequestTypeOptions = ({ t = () => {} }) => [
	{ label: t('myTickets:shipment'), value: 'shipment' },
	{ label: t('myTickets:rate'), value: 'rate' },
	{ label: t('myTickets:finance'), value: 'finance' },
	{ label: t('myTickets:platform_issue'), value: 'platform_issue' },
];

export const SHIPMENT_RATE_KEYS = ['request_type', 'organization_id', 'user_id',
	'serial_id', 'service', 'trade_type', 'category', 'sub_category', 'issue_type',
	'additional_information', 'priority', 'file_url', 'notify_customer', 'raised_by_desk',
	'raised_to_desk'];

export const FINANCE_PLATFORM_KEYS = ['request_type', 'category', 'sub_category', 'issue_type',
	'additional_information', 'priority',
	'file_url', 'notify_customer'];

export const PLATFORM_KEYS = ['request_type', 'platform_category', 'serial_id', 'service', 'trade_type',
	'issue_type', 'additional_information', 'priority', 'file_url', 'notify_customer'];

export const RATE_KEYS = ['request_type', 'organization_id', 'user_id', 'id_type',
	'serial_id', 'service_type', 'service', 'trade_type', 'category', 'sub_category', 'raised_by_desk',
	'raised_to_desk', 'issue_type', 'additional_information', 'priority', 'file_url', 'notify_customer'];

export const getRateShipmentServices = ({ t = () => {}, watchIdType = '' }) => {
	const options = [
		{
			label : t('myTickets:fcl'),
			value : 'fcl_freight',
		},
		{
			label : t('myTickets:lcl'),
			value : 'lcl_freight',
		},
		{
			label : t('myTickets:air'),
			value : 'air_freight',
		},
		{
			label : t('myTickets:ftl'),
			value : 'ftl_freight',
		},
		{
			label : t('myTickets:ltl'),
			value : 'ltl_freight',
		},
		{
			label : t('myTickets:fcl_customs'),
			value : 'fcl_customs',
		},
		{
			label : t('myTickets:lcl_customs'),
			value : 'lcl_customs',
		},
		{
			label : t('myTickets:fcl_cfs'),
			value : 'fcl_cfs',
		},
		{
			label : t('myTickets:trailer'),
			value : 'trailer_freight',
		},
		{
			label : t('myTickets:haulage'),
			value : 'haulage_freight',
		},
		{
			label : t('myTickets:air_customs'),
			value : 'air_customs',
		},
	];

	if (watchIdType === 'dislike_id') {
		return options?.filter((option) => option?.value !== 'fcl_cfs');
	}

	return options;
};

export const SINGLE_LOCATIONS = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'origin_fcl_customs',
	'destination_fcl_customs',
	'origin_lcl_customs',
	'destination_lcl_customs',
	'origin_air_customs',
	'destination_air_customs',
	'fcl_cfs',
	'fcl_freight_local',
	'air_freight_local',
	'lcl_freight_local',
	'ltl_freight',
];

export const sortByOptions = ({ t }) => [
	{ label: t('myTickets:created_at'), value: 'created_at' },
	{ label: t('myTickets:updated_at'), value: 'updated_at' },
	{ label: t('myTickets:messaged_at'), value: 'messaged_at' },
];

export const DISABLE_STATUS_KEY = ['dislike_id', 'missing_id'];

export const CLOSED_TICKET_STATUS = ['closed', 'overdue'];

export const EMPLOYEE_LEVEL = [0, 1, 2, 3, 4, 5];
export const MY_TEAM_LEVEL = ['assigned_to_my_team', 'raised_by_my_team'];
export const FETCH_API_FOR_REQUEST = ['shipment', 'feedback'];
