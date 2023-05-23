export const getTicketStatus = (val) => {
	if (
		['unresolved', 'reject_requested', 'resolve_requested'].includes(
			val,
		)
	) {
		return 'open';
	}
	if (val === 'overdue') {
		return 'closed';
	}
	return val;
};

export default getTicketStatus;

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
