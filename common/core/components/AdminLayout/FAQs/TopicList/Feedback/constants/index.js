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

export const STATUS_LABEL_MAPPING = {
	open: {
		label : 'OPEN',
		value : 'open',
	},
	closed: {
		label : 'CLOSED',
		value : 'closed',
	},
	overdue: {
		label : 'OVERDUE',
		value : 'overdue',
	},
	pending: {
		label : 'PENDING',
		value : 'pending',
	},
	escalated: {
		label : 'ESCALATED!!',
		value : 'escalated',
	},
};
