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

export const actionButtonKeys = ({
	unresolved: {
		label : 'Resolve',
		name  : 'resolve',
	},
	closed: {
		label : 'Reopen',
		name  : 'reopen',
	},
});

export const ticketSectionMapping = {
	Open: {
		Status: 'unresolved',
	},
	Pending: {
		Statuses: 'pending,reject_requested,resolve_requested',
	},
	Escalated: {
		Status: 'escalated',
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

export const MATCH_IMAGE_EXTENSION = /\.(jpg|jpeg|png|gif|svg)$/i;

export const TICKET_OPEN_STATUS = [
	'unresolved',
	'pending',
	'reject_requested',
	'resolve_requested',
];
