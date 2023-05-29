export const getTicketStatus = (val) => {
	if (
		['pending', 'reject_requested', 'resolve_requested'].includes(
			val,
		)
	) {
		return 'pending';
	}
	if (
		['closed', 'rejected', 'overdue'].includes(
			val,
		)
	) {
		return 'closed';
	}
	if (val === 'unresolved') {
		return 'open';
	}
	return val;
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
