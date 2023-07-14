function getTimeLineText({ ticketType }) {
	return {
		reviewer_assigned : 'This ticket has been created.',
		rejected          : 'This ticket has been rejected.',
		mark_as_resolved  : 'This ticket has been resolved.',
		reopened          : 'This ticket has been reopened.',
		ticket_updated    : `Ticket type has been updated to ${ticketType}.`,
	};
}

export default getTimeLineText;
