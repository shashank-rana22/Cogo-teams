export const STATUS_MAPPING = {
	pending           : 'pending',
	reject_requested  : 'pending',
	resolve_requested : 'pending',
	closed            : 'closed',
	rejected          : 'closed',
	overdue           : 'closed',
	unresolved        : 'open',
	escalated         : 'escalated',
};

export const STATUS_TYPE_MAPPING = {
	resolve: {
		Status : 'resolved',
		Type   : 'mark_as_resolved',
	},
	resolve_requested: {
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

export const STATUS_LABEL_MAPPING = {
	open: {
		label : 'Open',
		color : '#D6B300',
	},
	closed: {
		label : 'Closed',
		color : '#BDBDBD',
	},
	rejected: {
		label : 'Rejected!!',
		color : '#F37166',
	},
	pending: {
		label : 'Pending',
		color : '#F68B21',
	},
	escalated: {
		label : 'ESCALATED!!',
		color : '#F37166',
	},
};

export const PRIORITY_MAPPING = {
	high   : 'high',
	medium : 'medium',
	low    : 'low',
};
