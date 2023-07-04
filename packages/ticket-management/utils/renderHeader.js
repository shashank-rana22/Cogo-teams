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
		ticket_expired                   : 'The ticket has been expired.',
		automatically_reviewer_escalated : `This ticket has been escalated to ${name}.`,
	};

	if (type === 'escalated') {
		const types = {
			system : `This ticket has been escalated to ${reviewerName}`,
			user   : `${name} has escalated this ticket to ${oldReviewerName}`,
		};

		return types[userType];
	}

	return test?.[type];
}

export default getRenderHeader;
