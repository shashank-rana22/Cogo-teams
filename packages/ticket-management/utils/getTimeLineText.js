function getTimeLineText({ type, ticketType }) {
	switch (type) {
		case 'reviewer_assigned':
			return 'This ticket has been created.';
		case 'rejected':
			return 'This ticket has been rejected.';
		case 'mark_as_resolved':
			return 'This ticket has been resolved.';
		case 'ticket_updated':
			return `Ticket type has been updated to "${ticketType}".`;
		case 'reopened':
			return 'This ticket has been reopened.';
		default:
			return null;
	}
}
export default getTimeLineText;
