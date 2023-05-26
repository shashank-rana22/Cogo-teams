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
	// pending: {
	// 	label : 'Resolve',
	// 	name  : 'resolve',
	// },
	// escalated: {
	// 	label : 'Resolve',
	// 	name  : 'resolve',
	// },
	closed: {
		label : 'Reopen',
		name  : 'reopen',
	},
});
