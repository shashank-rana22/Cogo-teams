function getRenderHeader({
	t,
	type,
	name,
	userType,
	description,
	oldReviewerName,
	ticketType,
	reviewerName,
}) {
	const TIMELINES = {
		reviewer_reassigned              : `${name} ${t('myTickets:has_reassigned_this_ticket_to')} ${oldReviewerName}`,
		reviewer_assigned                : `${t('myTickets:this_ticket_has_been_assigned_to')} ${name}`,
		rejected                         : `${t('myTickets:this_ticket_has_been_rejected_by')} ${name}`,
		mark_as_resolved                 : `${t('myTickets:this_ticket_has_been_closed_by')} ${name}`,
		resolution_requested             : `${name} ${t('myTickets:has_initiated_resolution_request')}`,
		resolution_rejected              : `${name} ${t('myTickets:has_closed_resolution_request')}`,
		ticket_created                   : `${t('myTickets:ticket_has_been_created')}`,
		respond                          : `${description}`,
		ticket_updated                   : `${ticketType} ${t('myTickets:has_been_updated')}`,
		reopened                         : `${t('myTickets:this_ticket_has_been_reopened_by')} ${name}`,
		ticket_expired                   : `${t('myTickets:the_ticket_has_been_expired')}`,
		automatically_reviewer_escalated : `${t('myTickets:this_ticket_has_been_escalated_to')} ${oldReviewerName}.`,
		resolve_requested                : `${name} ${t('myTickets:has_requested_to_resolve_the_ticket')}`,
	};

	if (type === 'escalated') {
		const types = {
			system : `${t('myTickets:this_ticket_has_been_escalated_to')} ${reviewerName}`,
			user   : `${name} ${t('myTickets:has_escalated_this_ticket_to')} ${oldReviewerName}`,
		};

		return types[userType];
	}

	return TIMELINES?.[type];
}

export default getRenderHeader;
