import {
	asyncListFclFreightRate,
	asyncListLclFreightRate,
	asyncListAirFreightRate,
	asyncListFtlFreightRate,
	asyncListLtlFreightRate,
	asyncListFclCfsRate,
	asyncListHaulageFreightRate,
	asyncListFclCustomsRate,
	asyncListLclCustomsRate,
	asyncListAirCustomsRate,
	asyncListTrailerFreightRate,
	asyncListShipments,
} from '@cogoport/forms';

export const ASYNC_LIST_API = {
	sid             : asyncListShipments,
	fcl_freight     : asyncListFclFreightRate,
	lcl_freight     : asyncListLclFreightRate,
	air_freight     : asyncListAirFreightRate,
	ftl_freight     : asyncListFtlFreightRate,
	ltl_freight     : asyncListLtlFreightRate,
	fcl_cfs         : asyncListFclCfsRate,
	haulage_freight : asyncListHaulageFreightRate,
	fcl_customs     : asyncListFclCustomsRate,
	lcl_customs     : asyncListLclCustomsRate,
	air_customs     : asyncListAirCustomsRate,
	trailer_freight : asyncListTrailerFreightRate,
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
	'Closure Pending': {
		Statuses: 'pending,reject_requested,resolve_requested',
	},
	Escalated: {
		Statuses: 'escalated',
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

export const REQUIRED_ROLES = ['partner-roles', 'partner-users'];

export const getSpectatorTypeOptions = ({ t }) => [
	{ label: t('myTickets:spectator_type_1'), value: 'reviewer' },
	{ label: t('myTickets:spectator_type_2'), value: 'agent' },
	{ label: t('myTickets:spectator_type_3'), value: 'closure_authorizer' },
	{ label: t('myTickets:spectator_type_4'), value: 'configuration_owner' },
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

export const REQUEST_TYPE_OPTIONS = [
	{ label: 'Shipment', value: 'shipment' },
	{ label: 'Rate', value: 'rate' },
	{ label: 'Finance', value: 'finance' },
	{ label: 'Platform Issue', value: 'platform_issue' },
];

export const SHIPMENT_RATE_KEYS = ['request_type', 'organization_id', 'user_id',
	'serial_id', 'service', 'trade_type', 'category', 'sub_category', 'issue_type',
	'additional_information', 'priority', 'file_url', 'notify_customer', 'raised_by_desk',
	'raised_to_desk'];

export const FINANCE_PLATFORM_KEYS = ['request_type', 'category', 'sub_category', 'issue_type',
	'additional_information', 'priority',
	'file_url', 'notify_customer'];

export const RATE_KEYS = ['request_type', 'organization_id', 'user_id', 'id_type',
	'serial_id', 'service_type', 'service', 'trade_type', 'category', 'sub_category', 'raised_by_desk',
	'raised_to_desk', 'additional_information', 'priority', 'file_url', 'notify_customer'];

export const RATES_SHIPMENT_SERVICES = [
	{
		label : 'FCL',
		value : 'fcl_freight',
	},
	{
		label : 'LCL',
		value : 'lcl_freight',
	},
	{
		label : 'AIR',
		value : 'air_freight',
	},
	{
		label : 'FTL',
		value : 'ftl_freight',
	},
	{
		label : 'LTL',
		value : 'ltl_freight',
	},
	{
		label : 'FCL Customs',
		value : 'fcl_customs',
	},
	{
		label : 'LCL Customs',
		value : 'lcl_customs',
	},
	{
		label : 'FCL CFS',
		value : 'fcl_cfs',
	},
	{
		label : 'Trailer',
		value : 'trailer_freight',
	},
	{
		label : 'Haulage',
		value : 'haulage_freight',
	},
	{
		label : 'Air customs',
		value : 'air_customs',
	},
];

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
];
