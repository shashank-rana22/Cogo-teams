function getRenderHeader({
	type,
	name,
	userType,
	description,
	oldReviewerName,
	ticketType,
	reviewerName,
}) {
	const test = {
		reviewer_reassigned  : `${name} has reassigned this ticket to ${oldReviewerName}`,
		reviewer_assigned    : `This ticket has been assigned to ${name}`,
		rejected             : `This ticket has been rejected by ${name}`,
		mark_as_resolved     : `This ticket has been resolved by ${name}`,
		resolution_requested : `${name} has initiated resolution request.`,
		resolution_rejected  : `${name} has closed resolution request.`,
		ticket_created       : 'Ticket has been created.',
		respond              : `${description}`,
		ticket_updated       : `${ticketType} has been updated.`,
		reopened             : `This ticket has been reopened by ${name}`,
	};

	if (type === 'escalated' && userType === 'system') {
		return `This ticket has been escalated to ${reviewerName}`;
	}

	if (type === 'escalated' && userType === 'user') {
		return `${name} has escalated this ticket to ${oldReviewerName}`;
	}

	return test?.[type];
}

export default getRenderHeader;
